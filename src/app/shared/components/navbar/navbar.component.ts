import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    if (token !== '') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }
}
