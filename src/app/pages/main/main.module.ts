import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { routing } from './main.routing';

@NgModule({
	declarations: [MainPageComponent],
	imports: [
		CommonModule,
		SharedModule,

		routing],
	exports: []
})
export class MainModule { }
