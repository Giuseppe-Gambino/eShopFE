import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { iCart } from '../interfaces/i-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = environment.cartUrl;

  private cartSubject = new BehaviorSubject<number>(0);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  initCart(): void {
    this.http.get<iCart>(this.cartUrl).subscribe((cart) => {
      this.cartSubject.next(cart.cartItems.length);
    });
  }

  getCart(): Observable<iCart> {
    return this.http.get<iCart>(this.cartUrl);
  }

  removeCartItem(idCartItem: number): Observable<any> {
    return this.http.put(`${this.cartUrl}/removeCartItem/${idCartItem}`, {});
  }

  editQuantity(idCartItem: number, op: number): Observable<string> {
    return this.http.put<string>(
      `${this.cartUrl}/editQuantity/${idCartItem}`,
      {},
      {
        responseType: 'text' as 'json',
        params: { op: op.toString() },
      }
    );
  }

  addProductToCart(productId: number, quantity: number): Observable<any> {
    let params = new HttpParams()
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());
    return this.http.post(`${this.cartUrl}/add`, {}, { params });
  }

  updateLength(length: number) {
    this.cartSubject.next(length);
  }
}
