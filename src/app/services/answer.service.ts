import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ANSWER_API = environment.apiUrl + 'answer/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient) {}

  addAnswers(answers): Observable<any> {
    return this.http.post(ANSWER_API + 'add', answers, httpOptions);
  }

  getAnswers(questionId): Observable<any> {
    return this.http.post(
      ANSWER_API + 'get',
      { questionId: questionId },
      httpOptions
    );
  }
}
