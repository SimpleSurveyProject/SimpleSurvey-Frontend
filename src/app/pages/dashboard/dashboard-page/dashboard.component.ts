import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Survey } from 'src/app/interfaces/survey';
import { QuestionService } from './../../../services/question.service';
import { SurveyService } from './../../../services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  surveys: Survey[] = [];
  loading = true;
  successful!: boolean;
  errorText = '';

  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
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

  getQuestions(): void {
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

  copyShareUrl(id: number): void {
    this.clipboard.copy('https://simplesurvey.de/fillout?id=' + id);
    this.snackBar.open('Link copied to clipboard!', 'Close', {
      duration: 3000,
    });
  }

  deleteSurvey(id: number) {
    this.surveyService.deleteSurvey(id).subscribe(
      // tslint:disable-next-line: variable-name
      (_data) => {
        window.location.reload();
      },
      // tslint:disable-next-line: variable-name
      (_err) => {
        this.snackBar.open('Survey could not be deleted.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
