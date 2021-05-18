import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUser();
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
