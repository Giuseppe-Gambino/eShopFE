import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { iCart } from '../../interfaces/i-cart';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  logOutBoo: boolean = false;

  isLoggedIn: boolean = false;

  badge: boolean = false;
  cartItems!: number;
  avatar: string = 'avatar.png';

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private cartSvc: CartService,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userSvc.avatar$.subscribe((r) => {
      this.avatar = r || 'avatar.png';
    });

    this.cartSvc.cart$.subscribe((result) => {
      if (result) {
        this.cartItems = result;
      }
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
