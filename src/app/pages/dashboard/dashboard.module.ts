import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard-page/dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,

    routing,
  ],
  exports: [],
})
export class DashboardModule {}
