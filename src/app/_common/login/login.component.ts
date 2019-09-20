import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { UserService } from 'src/app/_services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>();
  fbWindow: Window;
  fbRedirectBase = 'http://localhost:4200';
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  get f (): FormGroup['controls'] { return this.loginForm.controls; }

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private userService: UserService,
  ) {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage, false);
    } else {
      (window as any).attachEvent('onmessage', this.handleMessage);
    }
  }

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
    this.data.user.pipe(takeUntil(this.destroyed))
    .subscribe(
      user => {
        if (user) {
          this.router.navigateByUrl(this.returnUrl);
        }
      }
    );
  }

  ngOnDestroy () {
    if (window.removeEventListener) {
      window.removeEventListener('message', this.handleMessage, false);
    } else {
      (window as any).removeEvent('onmessage', this.handleMessage);
    }

    this.destroyed.next();
    this.destroyed.complete();
  }

  fbLogin () {
    this.fbWindow = window.open(`https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=${environment.fbClient}&display=popup&redirect_uri=${window.location.origin}/facebook-auth.html&scope=email`, null, 'width=600,height=400');
  }

  handleMessage = (event: Event) => {
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (message.origin !== window.location.origin ||
      typeof(message.data) !== 'string') { return; }

    this.fbWindow.close();

    const result = JSON.parse(message.data);
    if (!result.status) {
      this.error = result.error + ': ' + result.errorDescription;
    } else {
      this.loading = true;
      this.userService.facebookLogin(result.accessToken, this.handleLoginFail);
    }
  }

  login () {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value, this.handleLoginFail);
  }

  handleLoginFail = (error) => {
    this.error = Object.values(error).join('\n');
    this.loading = false;
  }
}
