import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSurveyComponent } from './createsurvey-page/createsurvey.component';
import { routing } from './createsurvey.routing';

@NgModule({
  declarations: [CreateSurveyComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDividerModule,
    routing,
  ],
  exports: [],
})
export class CreateSurveyModule {}
