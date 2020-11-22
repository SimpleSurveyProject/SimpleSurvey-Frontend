import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [],
})
export class SharedModule { }
