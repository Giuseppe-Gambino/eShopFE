import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { iCart } from '../../interfaces/i-cart';
import { iCartItem } from '../../interfaces/i-cart-item';
import { OrderService } from '../../services/order.service';
import { iStripeResponse } from '../../interfaces/i-stripe-response';

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

  buttonBoo: boolean = false;
  isLoading: boolean = false;
  feedbackMessage: string | null = null;
  status!: boolean;

  constructor(private cartSvc: CartService, private orderSvc: OrderService) {}

  ngOnInit(): void {
    this.cartSvc.getCart().subscribe((result) => {
      if (!result.cartItems) {
        console.error('Errore: risposta API null o undefined');
        return;
      }
      this.cart = result;
      this.cartItemArr = result.cartItems;
      this.updateSum();
      if (this.cartItemArr.length == 0) {
        this.buttonBoo = false;
      } else {
        this.buttonBoo = true;
      }
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

    if (this.cartItemArr.length == 0) {
      this.buttonBoo = false;
    } else {
      this.buttonBoo = true;
    }
  }

  editQuantity(idCartItem: number, op: number) {
    const item = this.cartItemArr.find((item) => item.id === idCartItem);
    if (item && op == 0 && item.quantity > 1) {
      item.quantity -= 1;
    } else if (item && op == 1) {
      item.quantity += 1;
    }

    this.cartSvc.editQuantity(idCartItem, op).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        console.error(`Error updating quantity for item ${idCartItem}:`, error);
      }
    );
    this.updateSum();
  }

  checkOut(): void {
    this.feedbackMessage = null;

    this.orderSvc.createOrder().subscribe({
      next: (response: iStripeResponse) => {
        this.feedbackMessage =
          'Ti stiamo reindirizzando alla pagina di pagamento! non chiudere la pagina!!';
        this.status = true;
        this.isLoading = true;
        if (response.status === 'SUCCESS') {
          setTimeout(() => {
            this.orderSvc.redirectToSession(response.sessionUrl);
          }, 2000);
        }
      },
      error: (error) => {
        console.error("Errore nel processo dell'ordine", error);
        this.feedbackMessage =
          "Si è verificato un errore nel processo dell'ordine.";
        this.status = false;
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 2500);
      },
    });
  }
}
