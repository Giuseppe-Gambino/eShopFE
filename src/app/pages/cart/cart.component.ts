import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { iCart } from '../../interfaces/i-cart';
import { iCartItem } from '../../interfaces/i-cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart!: iCart;
  cartItem!: iCartItem[];

  count: number = 1;

  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.cartSvc.getCart().subscribe((result) => {
      if (!result.cartItems) {
        console.error('Errore: risposta API null o undefined');
        return;
      }
      this.cart = result;
      this.cartItem = result.cartItems;
      console.log(this.cart);
      console.log(result.cartItems);
      console.log(result.user);
    });
  }

  increase(quantity: number) {
    quantity++;
  }

  decrease(quantity: number) {
    if (quantity > 1) {
      quantity--;
    }
  }
}
