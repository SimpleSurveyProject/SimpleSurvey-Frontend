import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [{ path: '', component: MainPageComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
