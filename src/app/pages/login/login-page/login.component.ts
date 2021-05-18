import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
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
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  loading = false;
  successful: boolean;
  errorText: string;
  submitted = false;

  isLoggedIn = false;

  returnUrl: string;

  ngOnInit() {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    if (this.returnUrl) {
      this.snackBar.open('Please login in order to continue', 'Close', {
        duration: 5000,
      });
    }
    if (
      this.tokenStorageService.getToken() &&
      !this.tokenStorageService.isExpired()
    ) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.loading = true;
      this.submitted = true;
      this.authService
        .login({
          username: this.usernameFormControl.value,
          password: this.passwordFormControl.value,
        })
        .subscribe(
          (data) => {
            this.loading = false;
            this.successful = true;

            this.tokenStorageService.saveToken(data.token);
            this.tokenStorageService.saveUser(data);

            this.isLoggedIn = true;
            this.snackBar.open('Login successful', 'Close', {
              duration: 3000,
            });
            if (this.returnUrl) {
              window.location.href = this.returnUrl;
            } else {
              window.location.href = 'simplesurvey.de';
            }
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
