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

  questions = [];



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
  successful: boolean;
  errorText: string;
  surveyId: number;
  lastId = 0;
  isEdit = false;

  createButtonEnabled = false;
  nextButtonEnabled = true;

  stringButtonText = "create new survey";

  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
	  private activatedRoute: ActivatedRoute
  ) {}

	ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams['id']) {
      //edit survey
      this.stringButtonText = "save editing";

      this.loading = true;

      this.isEdit = true;
      this.surveyId = parseInt(this.activatedRoute.snapshot.queryParams['id']);

      this.titleFormControl.disable();
      this.nextButtonEnabled = false;

      this.surveyService.getSurvey(this.surveyId).subscribe(
        (data) => {
          var title = data.survey.title;
          var description = data.survey.description;

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


  onSubmitSurvey() {
    if (this.titleFormControl.valid && this.descriptionFormControl.valid) {
      this.loading = true;

      if(this.isEdit) {
        //edit survey
        this.surveyService
        .editSurvey({
          title: this.titleFormControl.value,
          description: this.descriptionFormControl.value,
          id: this.surveyId
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
        //new survey
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


  loadExistingQuestions() {
    this.loading = true;
    this.createButtonEnabled = false;

    this.questionService.getQuestions({
      id: this.surveyId
    }).subscribe(
      (data) => {
        data.questions.forEach((question) => {
          this.addQuestionWithData(question.text, question.style);
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

  onSubmitQuestions() {
    this.loading = true;

    if(this.isEdit) {
      this.questionService.clearAllQuestions(this.surveyId).toPromise();
    }



    let data = [];
    this.questions.forEach((question) => {
      data.push({
        position: question.id,
        style: question.style,
        text: question.text,
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
    this.createButtonEnabled = true;

    this.questions.push({
      id: this.lastId + 1,
      style: '',
      text: '',
    });
    this.lastId++;
  }

  addQuestionWithData(text: string, style: string) {
    this.createButtonEnabled = true;

    this.questions.push({
      id: this.lastId + 1,
      style: style,
      text: text,
    });
    this.lastId++;
  }

  removeQuestion(i: number) {
    let position = this.questions.findIndex((x) => x.id === i);
    this.questions.splice(position, 1);

    if(this.questions.length == 0) {
      this.createButtonEnabled = false;
    }
  }
}
