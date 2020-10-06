import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimpleSurvey';

  buttonText = "a";

  onClick() {
    if(this.buttonText == "a")this.buttonText = "b";
    else this.buttonText = "a";
  }
}
