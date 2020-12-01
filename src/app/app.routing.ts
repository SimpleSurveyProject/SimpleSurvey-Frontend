import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'createsurvey',
    loadChildren: () =>
      import('./pages/createsurvey/createsurvey.module').then(
        (m) => m.CreateSurveyModule
      ),
  },
  {
    path: 'fillout',
    loadChildren: () =>
      import('./pages/fillout/fillout.module').then((m) => m.FilloutModule),
  },
  {
    path: 'answers',
    loadChildren: () =>
      import('./pages/answers/answers.module').then((m) => m.AnswersModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
