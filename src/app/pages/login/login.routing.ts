import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
