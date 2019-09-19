import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroyed: Subject<void> = new Subject<void>();
  registerForm: FormGroup;
  loading = false;
  error = '';

  get f (): FormGroup['controls'] { return this.registerForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
      password: ['', [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})/)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  register (govAccount: boolean = false) {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value, govAccount)
    .pipe(takeUntil(this.destroyed))
    .subscribe(
      success => {
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log('Registration failed: ', error);
        this.error = Object.values(error).join('\n');
        this.loading = false;
      }
    );
  }
}
