import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from './../../../services/question.service';
import { SurveyService } from './../../../services/survey.service';

@Component({
  selector: 'app-fillout',
  templateUrl: './fillout.component.html',
  styleUrls: ['./fillout.component.css'],
})
export class FilloutComponent {
  surveyIdFormControl = new FormControl('', [Validators.required]);

  id: number;
  survey: any;
  questions = [];
  loading = true;
  successful: boolean;
  errorText: string;
  answersSent = false;

  constructor(
    private answerService: AnswerService,
    private surveyService: SurveyService,
    private questionService: QuestionService
  ) {}

  onSubmitId() {
    this.id = this.surveyIdFormControl.value;

    this.surveyService.getSurvey(this.id).subscribe(
      (data) => {
        this.survey = data.survey;
        this.getQuestions();
        this.loading = false;
        this.successful = true;
      },

      (err) => {
        this.errorText = err.error.message;
        this.loading = false;
        this.successful = false;
      }
    );
  }

  getQuestions() {
    this.questionService.getQuestions(this.survey).subscribe(
      (data) => {
        data.questions.forEach((question) => {
          this.questions.push({
            question: question.text,
            questionid: question.id,
            answer: '',
          });
        });
      },
      (err) => {
        this.errorText = err.error.message;
        this.loading = false;
        this.successful = false;
      }
    );
  }

  onSubmitQuestions() {
    let answers = [];
    this.questions.forEach((question) => {
      answers.push({
        questionId: question.questionid,
        text: question.answer,
      });
    });
    this.answerService.addAnswers(answers).subscribe(
      (data) => {
        this.answersSent = true;
      },
      (err) => {
        this.errorText = err.error.message;
      }
    );
  }
}
