import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent {
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

  constructor(private authService: AuthService) {}

  loading = false;
  successful: boolean;
  errorText: string;

  onSubmit() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.loading = true;
      this.authService
        .register({
          username: this.usernameFormControl.value,
          password: this.passwordFormControl.value,
        })
        .subscribe(
          (data) => {
            this.loading = false;
            this.successful = true;
          },
          (err) => {
            if (err.error.message == 'Error: Username is already taken!') {
              this.usernameFormControl.setErrors({ incorrect: true });
            }
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
