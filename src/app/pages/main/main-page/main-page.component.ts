import { TokenStorageService } from './../../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}
  loggedIn = false;

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      if (this.tokenStorageService.isExpired()) {
        this.tokenStorageService.signOut();
        window.location.reload();
      } else {
        this.loggedIn = true;
      }
    }
  }

  onDashboardClick() {
    this.router.navigate(['/dashboard']);
  }

  onFilloutClick() {
    this.router.navigate(['/fillout']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }
}
