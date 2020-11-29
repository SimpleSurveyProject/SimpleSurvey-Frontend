import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SURVEY_API = 'http://simplesurvey.de:8443/api/survey/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  createSurvey(survey): Observable<any> {
    return this.http.post(
      SURVEY_API + 'create',
      {
        description: survey.description,
        title: survey.title,
      },
      httpOptions
    );
  }

  getOwnSurveys(): Observable<any> {
    return this.http.get(SURVEY_API + 'getown');
  }
}
