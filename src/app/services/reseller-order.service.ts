import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iResellerOrder } from '../interfaces/i-reseller-order';
import { iStatsResellerOrders } from '../interfaces/i-stats-reseller-orders';
import { iPageAble } from '../interfaces/i-page-able';

@Injectable({
  providedIn: 'root',
})
export class ResellerOrderService {
  resellerUrl = environment.resellerOrderUrl;

  constructor(private http: HttpClient) {}

  getResellerOrders(
    page: number,
    size: number,
    orderStatus: string,
    date?: string,
    startDate?: string,
    endDate?: string
  ): Observable<iPageAble> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (orderStatus) {
      params = params.set('orderStatus', orderStatus);
    }
    if (date) {
      params = params.set('date', date);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<iPageAble>(this.resellerUrl, { params });
  }

  getStatsResellerOrders(): Observable<iStatsResellerOrders> {
    return this.http.get<iStatsResellerOrders>(`${this.resellerUrl}/count`);
  }

  editResellerOrder(id: number, status: string): Observable<iResellerOrder> {
    let params = new HttpParams()
      .set('id', id.toString())
      .set('status', status);

    return this.http.put<iResellerOrder>(
      `${this.resellerUrl}/updateStatus`,
      {},
      { params }
    );
  }
}
