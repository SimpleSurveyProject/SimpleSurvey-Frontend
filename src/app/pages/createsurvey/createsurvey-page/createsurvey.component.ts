import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { SurveyService } from './../../../services/survey.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.css'],
})
export class CreateSurveyComponent {
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  questionFormControl = new FormControl('', [Validators.required]);

  loading = false;
  successful: boolean;
  errorText: string;
  surveyId: number;

  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService
  ) {}

  onSubmitSurvey() {
    if (this.titleFormControl.valid && this.descriptionFormControl.valid) {
      this.loading = true;

      this.surveyService
        .createSurvey({
          title: this.titleFormControl.value,
          description: this.descriptionFormControl.value,
        })
        .subscribe(
          (data) => {
            this.surveyId = data.id;
            this.loading = false;
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

  onSubmitQuestion() {
    if (this.questionFormControl.valid) {
      this.loading = true;

      this.questionService
        .addQuestion({
          text: this.questionFormControl.value,
          surveyId: this.surveyId,
        })
        .subscribe(
          (data) => {
            this.loading = false;
            this.successful = true;
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
