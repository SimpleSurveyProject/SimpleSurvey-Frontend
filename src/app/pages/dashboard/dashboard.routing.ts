import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-page/dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
