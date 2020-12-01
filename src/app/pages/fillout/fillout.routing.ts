import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { FilloutComponent } from './fillout-page/fillout.component';

const routes: Routes = [{ path: '', component: FilloutComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
