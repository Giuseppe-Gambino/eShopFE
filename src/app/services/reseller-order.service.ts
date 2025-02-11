import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iResellerOrder } from '../interfaces/i-reseller-order';
import { IPageResellerOrder } from '../interfaces/i-page-reseller-order';
import { iStatsResellerOrders } from '../interfaces/i-stats-reseller-orders';

@Injectable({
  providedIn: 'root',
})
export class ResellerOrderService {
  resellerUrl = environment.resellerOrderUrl;

  constructor(private http: HttpClient) {}

  getResellerOrders(
    page: number,
    orderStatus: string,
    date?: string,
    startDate?: string,
    endDate?: string
  ): Observable<IPageResellerOrder> {
    let params = new HttpParams().set('page', page).set('size', '12');

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

    return this.http.get<IPageResellerOrder>(this.resellerUrl, { params });
  }

  getStatsResellerOrders(): Observable<iStatsResellerOrders> {
    return this.http.get<iStatsResellerOrders>(`${this.resellerUrl}/count`);
  }

  editResellerOrder(id: number, status: string): Observable<iResellerOrder> {
    let params = new HttpParams()
      .set('id', id.toString())
      .set('status', status);
    console.log(params);

    return this.http.put<iResellerOrder>(
      `${this.resellerUrl}/updateStatus`,
      {},
      { params }
    );
  }
}
