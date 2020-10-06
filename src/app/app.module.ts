import { SharedModule } from 'src/app/shared/shared.module';
import { routing } from './pages/main/main.routing';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,

    SharedModule,
    RouterModule.forRoot([]),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
