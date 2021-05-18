import { Answer } from './../../../interfaces/answer';
import { Question, QuestionWithAnswer } from './../../../interfaces/question';
import { Survey } from './../../../interfaces/survey';
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
export class FilloutComponent implements OnInit {
  surveyIdFormControl = new FormControl('', [Validators.required]);

  id!: number;
  survey!: Survey;
  questions: QuestionWithAnswer[] = [];
  loading = true;
  successful!: boolean;
  errorText: string = '';
  answersSent: boolean = false;

  constructor(
    private answerService: AnswerService,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idString: string | null =
      this.activatedRoute.snapshot.queryParamMap.get('id');
    if (idString != null) {
      this.id = parseInt(idString);
    }

    if (this.id) {
      this.surveyService.getSurvey(this.id).subscribe(
        (data) => {
          this.successful = true;
          this.survey = data.survey;
          this.getQuestions();
          this.loading = false;
        },

        (err) => {
          this.errorText = err.error.message;
          this.loading = false;
          this.successful = false;
        }
      );
    }
  }

  onSubmitId(): void {
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

  getQuestions(): void {
    this.questionService.getQuestions(this.survey).subscribe(
      (data) => {
        data.questions.forEach((question: Question) => {
          this.questions.push({
            text: question.text,
            id: question.id,
            style: question.style,
            position: question.position,
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

  onSubmitQuestions(): void {
    let answers: Answer[] = [];
    this.questions.forEach((question) => {
      answers.push({
        questionId: question.id,
        text: question.answer,
      });
    });
    this.answerService.addAnswers(answers).subscribe(
      (_data) => {
        this.answersSent = true;
      },
      (err) => {
        this.errorText = err.error.message;
      }
    );
  }
}
