import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { iCart } from '../../interfaces/i-cart';
import { UserService } from '../../services/user.service';
import { iUser, Role } from '../../interfaces/i-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  logOutBoo: boolean = false;

  isLoggedIn: boolean = false;

  isSeller: boolean = false;
  isAdmin: boolean = false;

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
    this.authSvc.user$.subscribe({
      next: (user) => {
        if (!user) return;
        if (
          user.roles.includes(Role.ROLE_ADMIN) ||
          user.roles.includes(Role.ROLE_SELLER)
        ) {
          this.isSeller = true;
        }
        if (user.roles.includes(Role.ROLE_ADMIN)) {
          this.isAdmin = true;
        }
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.refreshAvatar();
    });

    this.cartSvc.cart$.subscribe((result) => {
      if (result) {
        this.cartItems = result;
      }
    });
  }

  refreshAvatar() {
    if (!this.isLoggedIn) return;
    this.userSvc.getAvatar();
    this.userSvc.avatar$.subscribe((r) => {
      this.avatar = r || 'avatar.png';
    });
  }

  logOut() {
    this.isSeller = false;
    this.isAdmin = false;
    this.authSvc.logout();
    this.logOutBoo = true;
    setTimeout(() => {
      this.logOutBoo = false;
    }, 2000);
  }
}
