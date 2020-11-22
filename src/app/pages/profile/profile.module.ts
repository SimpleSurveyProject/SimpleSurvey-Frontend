import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile-page/profile.component';
import { routing } from './profile.routing';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, MatExpansionModule, routing],
  exports: [],
})
export class ProfileModule {}
