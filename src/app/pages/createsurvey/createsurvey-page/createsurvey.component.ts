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

  questions = [
    {
      id: 0,
      question: '',
    },
  ];

  loading = false;
  successful: boolean;
  errorText: string;
  surveyId: number;
  lastId = 0;

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

  onSubmitQuestions() {
    this.loading = true;
    let data = [];
    this.questions.forEach((question) => {
      data.push({
        text: question.question,
        surveyId: this.surveyId,
      });
    });
    this.questionService.addQuestions(data).subscribe(
      (data) => {},
      (err) => {
        this.errorText = err.error.message;
        this.loading = false;
        this.successful = false;
      }
    );
    this.loading = false;
    this.successful = true;
  }

  addQuestion() {
    this.questions.push({
      question: '',
      id: this.lastId + 1,
    });
    this.lastId++;
  }

  removeQuestion(i: number) {
    let position = this.questions.findIndex((x) => x.id === i);
    this.questions.splice(position, 1);
  }
}
