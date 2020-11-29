import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const QUESTION_API = 'http://simplesurvey.de:8443/api/question/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  addQuestion(question): Observable<any> {
    return this.http.post(
      QUESTION_API + 'add',
      {
        text: question.text,
        surveyId: question.surveyId,
      },
      httpOptions
    );
  }

  getQuestions(survey): Observable<any> {
    return this.http.post(
      QUESTION_API + 'get',
      {
        surveyId: survey.id,
      },
      httpOptions
    );
  }
}
