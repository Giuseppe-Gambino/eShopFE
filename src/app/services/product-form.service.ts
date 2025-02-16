import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iProductRequest } from '../interfaces/i-product-request';
import { iProduct } from '../interfaces/i-product';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  private productUrl = environment.productUrl;

  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      general: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      }),

      gallery: this.fb.group({
        selectedFiles: [[], Validators.required],
        imgsArr: [[]],
      }),

      hero: this.fb.group({
        titleSeconda: ['', Validators.required],
        descriptionSeconda: ['', Validators.required],
        titleTerza: ['', Validators.required],
        descriptionTerza: ['', Validators.required],
        imgFile: [[]],
        imgString: [[]],
      }),
      priceCategory: this.fb.group({
        price: [null, Validators.required],
        categoryId: [null, Validators.required],
      }),
    });
  }

  patchProduct(product: iProduct) {
    this.productForm.patchValue({
      general: {
        name: product.name,
        description: product.description,
      },

      gallery: {
        imgsArr: product.imageUrls,
      },

      hero: {
        titleSeconda: product.titleSeconda,
        descriptionSeconda: product.descriptionSeconda,
        titleTerza: product.titleTerza,
        descriptionTerza: product.descriptionTerza,
        imgString: product.imageUrls.slice(-2, product.imageUrls.length),
      },
      priceCategory: {
        price: product.price,
        categoryId: product.category?.id,
      },
    });
  }

  getFormValue() {
    return this.productForm.value;
  }

  clearForm() {
    this.productForm.reset();
  }
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
}
