import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register-page/register.component';
import { routing } from './register.routing';

@NgModule({
  declarations: [RegisterComponent],
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
export class RegisterModule {}
