import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-page/register.component';

const routes: Routes = [{ path: '', component: RegisterComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
