import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { UserService } from 'src/app/_services/user.service';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>();
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
  ) { }

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
    this.data.user.pipe(takeUntil(this.destroyed))
    .subscribe(
      user => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        }
      }
    );
  }

  ngOnDestroy () {
    this.destroyed.next();
    this.destroyed.complete();
  }

  login () {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(this.f.username.value, this.f.password.value, this.handleLoginFail);
  }

  handleLoginFail = (error) => {
    this.error = error.login_failure[0] || '';
    this.loading = false;
  }

  fbLogin(event) {
    // TODO: FB login
    console.log(event);
  }
}
