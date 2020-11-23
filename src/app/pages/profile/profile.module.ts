import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile-page/profile.component';
import { routing } from './profile.routing';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MatButtonModule,
    routing,
  ],
  exports: [],
})
export class ProfileModule {}
