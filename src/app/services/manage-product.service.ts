import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iPageAble } from '../interfaces/i-page-able';

@Injectable({
  providedIn: 'root',
})
export class ManageProductService {
  productUrl: string = environment.productUrl;

  constructor(private http: HttpClient) {}

  getProductsBySeller(page: number): Observable<iPageAble> {
    let params = new HttpParams().set('page', page).set('size', '12');
    return this.http.get<iPageAble>(this.productUrl + '/findByReseller', {
      params,
    });
  }
}
