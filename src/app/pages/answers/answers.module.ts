import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
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

    routing,
  ],
  exports: [],
})
export class AnswersModule {}
