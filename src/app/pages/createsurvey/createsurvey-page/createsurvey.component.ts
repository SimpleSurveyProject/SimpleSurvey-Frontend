import { Question } from './../../../interfaces/question';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { QuestionService } from './../../../services/question.service';
import { SurveyService } from './../../../services/survey.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createsurvey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.css'],
})
export class CreateSurveyComponent implements OnInit {
  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  questions: Question[] = [];

  styles = [
    {
      text: 'TEXT',
      description: 'Freetext answer',
    },
    {
      text: 'YESNO',
      description: 'Yes/No answer',
    },
    {
      text: 'ONETOTEN',
      description: 'Rate from 1 to 10 answer',
    },
  ];

  loading = false;
  successful!: boolean;
  errorText = '';
  surveyId!: number;
  lastId = 0;
  isEdit = false;

  createButtonEnabled = false;
  nextButtonEnabled = true;

  stringButtonText = 'create new survey';

  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.id) {
      // edit survey
      this.stringButtonText = 'save editing';

      this.loading = true;

      this.isEdit = true;
      this.surveyId = parseInt(this.activatedRoute.snapshot.queryParams.id, 10);

      this.titleFormControl.disable();
      this.nextButtonEnabled = false;

      this.surveyService.getSurvey(this.surveyId).subscribe(
        (data) => {
          const title = data.survey.title;
          const description = data.survey.description;

          this.titleFormControl.setValue(title);
          this.descriptionFormControl.setValue(description);

          this.loading = false;
          this.successful = true;

          this.titleFormControl.enable();
          this.nextButtonEnabled = true;
        },

        (err) => {
          this.errorText = err.error.message;
          this.loading = false;
          this.successful = false;
        }
      );
    }
  }

  onSubmitSurvey(): void {
    if (this.titleFormControl.valid && this.descriptionFormControl.valid) {
      this.loading = true;

      if (this.isEdit) {
        // edit survey
        this.surveyService
          .editSurvey({
            title: this.titleFormControl.value,
            description: this.descriptionFormControl.value,
            id: this.surveyId,
          })
          .subscribe(
            (data) => {
              this.surveyId = data.id;
              this.loading = false;

              this.loadExistingQuestions();
            },
            (err) => {
              this.errorText = err.error.message;
              this.loading = false;
              this.successful = false;
            }
          );
      } else {
        // new survey
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
      }
    } else {
      console.log('Input not valid!');
    }
  }

  loadExistingQuestions(): void {
    this.loading = true;
    this.createButtonEnabled = false;

    this.questionService
      .getQuestions({
        id: this.surveyId,
      })
      .subscribe(
        (data) => {
          data.questions.forEach((question: Question) => {
            this.addQuestionWithData(
              question.text,
              question.style,
              question.position
            );
          });
          this.loading = false;
        },
        (err) => {
          this.errorText = err.error.message;
          this.loading = false;
          this.successful = false;
        }
      );
  }

  onSubmitQuestions(): void {
    this.loading = true;

    if (this.isEdit) {
      this.questionService.clearAllQuestions(this.surveyId).toPromise();
    }

    const data: Question[] = [];
    this.questions.forEach((question) => {
      data.push({
        id: question.id,
        style: question.style,
        text: question.text,
        position: question.position,
        surveyId: this.surveyId,
      });
    });
    this.questionService.addQuestions(data).subscribe(
      // tslint:disable-next-line: variable-name
      (_data) => {},
      (err) => {
        this.errorText = err.error.message;
        this.loading = false;
        this.successful = false;
      }
    );
    this.loading = false;
    this.successful = true;
  }

  addQuestion(): void {
    this.createButtonEnabled = true;

    this.questions.push({
      id: this.lastId + 1,
      style: '',
      text: '',
      position: -1,
    });
    this.lastId++;
  }

  addQuestionWithData(text: string, style: string, position: number): void {
    this.createButtonEnabled = true;

    this.questions.push({
      id: this.lastId + 1,
      style,
      text,
      position,
    });
    this.lastId++;
  }

  removeQuestion(i: number): void {
    const position = this.questions.findIndex((x) => x.id === i);
    this.questions.splice(position, 1);

    if (this.questions.length === 0) {
      this.createButtonEnabled = false;
    }
  }
}
