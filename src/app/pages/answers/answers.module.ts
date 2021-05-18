import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnswersComponent } from './answers-page/answers.component';
import { routing } from './answers.routing';

@NgModule({
  declarations: [AnswersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatExpansionModule,
    NgApexchartsModule,

    routing,
  ],
  exports: [],
})
export class AnswersModule {}
