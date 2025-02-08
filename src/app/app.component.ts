import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eShopFE';

  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.cartService.initCart();
      this.userSvc.getAvatar();
    }
  }
}
