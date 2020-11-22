import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login-page/login.component';
import { routing } from './login.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,

    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule,

    routing,
  ],
  exports: [],
})
export class LoginModule {}
