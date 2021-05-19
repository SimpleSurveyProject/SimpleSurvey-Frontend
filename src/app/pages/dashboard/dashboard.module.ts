import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    ClipboardModule,
    MatSnackBarModule,
    MatIconModule,

    routing,
  ],
  exports: [],
})
export class DashboardModule {}
