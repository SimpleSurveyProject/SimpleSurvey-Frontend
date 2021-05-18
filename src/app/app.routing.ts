import { Routes } from '@angular/router';
import { AuthGuard } from './services/authguard.service';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'createsurvey',
    loadChildren: () =>
      import('./pages/createsurvey/createsurvey.module').then(
        (m) => m.CreateSurveyModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'fillout',
    loadChildren: () =>
      import('./pages/fillout/fillout.module').then((m) => m.FilloutModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'answers',
    loadChildren: () =>
      import('./pages/answers/answers.module').then((m) => m.AnswersModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
