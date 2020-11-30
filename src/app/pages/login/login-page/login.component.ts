import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(40),
  ]);

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private snackBar: MatSnackBar
  ) {}

  loading = false;
  successful: boolean;
  errorText: string;

  isLoggedIn = false;

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.loading = true;
      this.authService
        .login({
          username: this.usernameFormControl.value,
          password: this.passwordFormControl.value,
        })
        .subscribe(
          (data) => {
            this.loading = false;
            this.successful = true;

            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);

            this.isLoggedIn = true;
            this.snackBar.open('Login successful', 'Close', {
              duration: 3000,
            });
            window.location.href = 'simplesurvey.de';
          },
          (err) => {
            this.errorText = err.error.message;
            this.loading = false;
            this.successful = false;
          }
        );
    } else {
      console.log('Input not valid!');
    }
  }
}
