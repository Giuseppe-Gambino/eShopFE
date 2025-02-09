import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iOrder } from '../interfaces/i-order';
import { iStripeResponse } from '../interfaces/i-stripe-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderUrl: string = environment.orderUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // aggiornare graficamente il cart e mandare popup di caricamento per rendirizzare alla pagina di pagamento

  redirectToSession(sessionUrl: string): void {
    window.location.href = sessionUrl;
  }

  createOrder(): Observable<iStripeResponse> {
    return this.http.post<iStripeResponse>(`${this.orderUrl}/create`, {});
  }
}
