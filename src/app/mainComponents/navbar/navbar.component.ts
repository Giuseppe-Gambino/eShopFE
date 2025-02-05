import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  logOutBoo: boolean = false;

  isLoggedIn: boolean = false;

  constructor(private router: Router, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logOut() {
    this.authSvc.logout();
    this.logOutBoo = true;
    setTimeout(() => {
      this.logOutBoo = false;
    }, 2000);
  }
}
