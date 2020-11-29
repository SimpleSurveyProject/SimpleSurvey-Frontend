import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../../../services/question.service';
import { SurveyService } from './../../../services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  surveys = [];
  loading = true;
  successful: boolean;
  errorText: string;

  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.surveyService.getOwnSurveys().subscribe(
      (data) => {
        this.surveys = data.surveys;
        this.getQuestions();
      },

      (err) => {
        this.errorText = err.error.message;
        this.loading = false;
        this.successful = false;
      }
    );
  }

  getQuestions() {
    this.surveys.forEach((survey) => {
      this.questionService.getQuestions(survey).subscribe(
        (data) => {
          survey.questions = data.questions;
        },
        (err) => {
          this.errorText = err.error.message;
          this.loading = false;
          this.successful = false;
        }
      );
    });
    this.loading = false;
    this.successful = true;
  }
}
