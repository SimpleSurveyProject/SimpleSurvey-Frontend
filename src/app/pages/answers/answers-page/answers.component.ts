import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from './../../../services/question.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  questions = [];
  successful: boolean;
  errorText: string;

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('id');
    this.getQuestions(id);
  }

  getQuestions(id) {
    this.questionService
      .getQuestions({
        id: id,
      })
      .subscribe(
        (data) => {
          data.questions.forEach((question) => {
            let answer;
            this.answerService.getAnswers(question.id).subscribe(
              (data) => {
                this.questions.push({
                  question: question.text,
                  questionid: question.id,
                  style: question.style,
                  answer: data.answers,
                });
              },
              (err) => {
                this.errorText = err.error.message;
                this.successful = false;
              }
            );
          });
          this.successful = true;
        },
        (err) => {
          this.errorText = err.error.message;
          this.successful = false;
        }
      );
  }
}
