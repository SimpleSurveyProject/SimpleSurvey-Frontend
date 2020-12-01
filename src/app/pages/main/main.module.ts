import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { routing } from './main.routing';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, SharedModule, MatCardModule, routing],
  exports: [],
})
export class MainModule {}
