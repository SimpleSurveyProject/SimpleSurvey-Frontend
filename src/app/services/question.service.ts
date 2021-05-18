import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from './../interfaces/question';

const QUESTION_API = environment.apiUrl + 'question/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  addQuestions(questions: Question[]): Observable<any> {
    return this.http.post(QUESTION_API + 'add', questions, httpOptions);
  }

  clearAllQuestions(surveyId: number): Observable<any> {
    console.log(surveyId);
    return this.http.post(
      QUESTION_API + 'clear',
      {
        surveyId: surveyId,
      },
      httpOptions
    );
  }

  getQuestions(survey: any): Observable<any> {
    return this.http.post(
      QUESTION_API + 'get',
      {
        surveyId: survey.id,
      },
      httpOptions
    );
  }
}
