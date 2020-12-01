import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers-page/answers.component';

const routes: Routes = [{ path: '', component: AnswersComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
