import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { iCart } from '../interfaces/i-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = environment.cartUrl;

  private cartSubject = new BehaviorSubject<iCart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  initCart(): void {
    this.http.get<iCart>(this.cartUrl).subscribe((cart) => {
      this.cartSubject.next(cart);
    });
  }

  getCart(): Observable<iCart> {
    return this.http.get<iCart>(this.cartUrl);
  }

  getLenght(): number {
    return this.cartSubject.getValue()?.cartItems.length ?? 0;
  }

  updateCart(cart: iCart): void {
    this.cartSubject.next(cart);
  }
}
