import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './createsurvey-page/createsurvey.component';

const routes: Routes = [{ path: '', component: CreateSurveyComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
