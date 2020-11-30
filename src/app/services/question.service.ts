import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const QUESTION_API = environment.apiUrl + 'question/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  addQuestions(questions): Observable<any> {
    return this.http.post(QUESTION_API + 'add', questions, httpOptions);
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
