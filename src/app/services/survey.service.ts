import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const SURVEY_API = environment.apiUrl + 'survey/';

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

  editSurvey(survey): Observable<any> {
    return this.http.post(
      SURVEY_API + 'editsurvey',
      {
        description: survey.description,
        title: survey.title,
        surveyId: survey.id,
      },
      httpOptions
    );
  }

  getOwnSurveys(): Observable<any> {
    return this.http.get(SURVEY_API + 'getown');
  }

  getSurvey(id: number): Observable<any> {
    return this.http.post(
      SURVEY_API + 'getbyid',
      {
        surveyId: id,
      },
      httpOptions
    );
  }
}
