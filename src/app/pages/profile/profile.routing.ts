import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile-page/profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
