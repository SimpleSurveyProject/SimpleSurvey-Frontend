import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
} from 'ng-apexcharts';
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

  pieChart = {
    type: 'pie',
  };
  barChart = {
    type: 'bar',
  };
  pieLabels: any;
  barLabels: any;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private questionService: QuestionService
  ) {
    this.plotOptions = {
      bar: {
        horizontal: true,
      },
    };

    this.pieLabels = ['Yes', 'No'];
    this.barLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];
  }

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
            this.answerService.getAnswers(question.id).subscribe(
              (data) => {
                if (question.style == 'YESNO') {
                  this.questions.push({
                    question: question.text,
                    questionid: question.id,
                    style: question.style,
                    yesno: [
                      data.answers.reduce((n, x) => n + (x.text == 'yes'), 0),
                      data.answers.reduce((n, x) => n + (x.text == 'no'), 0),
                    ],
                  });
                } else if (question.style == 'ONETOTEN') {
                  this.questions.push({
                    question: question.text,
                    questionid: question.id,
                    style: question.style,
                    series: [
                      {
                        data: [
                          data.answers.reduce((n, x) => n + (x.text == '1'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '2'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '3'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '4'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '5'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '6'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '7'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '8'), 0),
                          data.answers.reduce((n, x) => n + (x.text == '9'), 0),
                          data.answers.reduce(
                            (n, x) => n + (x.text == '10'),
                            0
                          ),
                        ],
                      },
                    ],
                  });
                } else {
                  this.questions.push({
                    question: question.text,
                    questionid: question.id,
                    style: question.style,
                    answer: data.answers,
                  });
                }
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
