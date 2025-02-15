import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iProduct } from '../interfaces/i-product';
import { iPageAble } from '../interfaces/i-page-able';
import { iProductRequest } from '../interfaces/i-product-request';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productUrl = environment.productUrl;
  private productPageUrl = environment.productPageUrl;

  constructor(private http: HttpClient) {}

  createProduct(
    categoryId: number,
    productRequest: iProductRequest
  ): Observable<iProduct> {
    return this.http.post<iProduct>(
      `${this.productUrl}/${categoryId}`,
      productRequest
    );
  }

  addImgs(productId: number, images: File[]): Observable<iProduct> {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.patch<iProduct>(
      `${this.productUrl}/${productId}/images`,
      formData
    );
  }

  updateProductInfo(
    id: number,
    productDTO: iProductRequest
  ): Observable<iProduct> {
    return this.http.put<iProduct>(`${this.productUrl}/${id}`, productDTO);
  }

  getAll(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(this.productUrl);
  }

  getProductsPage(
    page: number,
    name?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<iPageAble> {
    let params = new HttpParams().set('page', page).set('size', '5');

    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }
    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice);
    }
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice);
    }

    return this.http.get<iPageAble>(this.productPageUrl, { params });
  }

  getProductById(id: number): Observable<iProduct> {
    return this.http.get<iProduct>(`${this.productUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }
}
