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
  cartItemArr!: iCartItem[];
  sum: number = 0;

  count: number = 1;

  constructor(private cartSvc: CartService) {}

  ngOnInit(): void {
    this.cartSvc.getCart().subscribe((result) => {
      if (!result.cartItems) {
        console.error('Errore: risposta API null o undefined');
        return;
      }
      this.cart = result;
      this.cartItemArr = result.cartItems;
      this.updateSum();
    });
  }

  updateSum() {
    this.sum = this.cartItemArr.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  deleteCartItem(idCartItem: number) {
    this.cartSvc.removeCartItem(idCartItem).subscribe(
      () => {
        this.cartSvc.updateLength(this.cartItemArr.length);
      },
      (error) => {
        console.error(`Errore nella rimozione ${idCartItem}:`, error);
      }
    );
    this.cartItemArr = this.cartItemArr.filter((item) => item.id != idCartItem);
    this.updateSum();
  }

  editQuantity(idCartItem: number, op: number) {
    const item = this.cartItemArr.find((item) => item.id === idCartItem);
    if (item && op == 0 && item.quantity > 1) {
      item.quantity -= 1;
      this.cartSvc.updateLength(item.quantity);
    } else if (item && op == 1) {
      item.quantity += 1;
      this.cartSvc.updateLength(item.quantity);
    }

    this.cartSvc.editQuantity(idCartItem, op).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(`Error updating quantity for item ${idCartItem}:`, error);
      }
    );
    this.updateSum();
  }
}
