import { TokenStorageService } from './../../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    if (
      this.tokenStorageService.getToken() &&
      this.tokenStorageService.isExpired()
    ) {
      this.tokenStorageService.signOut();
    }
  }
}
