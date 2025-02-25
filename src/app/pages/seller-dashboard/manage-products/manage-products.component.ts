import { iPageAble } from './../../../interfaces/i-page-able';
import { Component, OnInit } from '@angular/core';
import { ManageProductService } from '../../../services/manage-product.service';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { iProduct } from '../../../interfaces/i-product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss',
})
export class ManageProductsComponent implements OnInit {
  productArr: iProduct[] = [];
  pageable!: iPageAble;

  currentPage: number = 0;
  currentSize: number = 12;
  listSize: number[] = [6, 12, 24, 36, 48, 60];

  constructor(
    private manageProd: ManageProductService,
    private productSvc: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.manageProd.getProductsBySeller(this.currentPage).subscribe({
      next: (res) => {
        this.pageable = res;
        this.productArr = res.content as iProduct[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  incrementa() {
    if (
      this.currentPage < this.pageable?.totalPages &&
      this.currentPage + 1 != this.pageable?.totalPages
    ) {
      this.currentPage++;
      this.onload();
    }
  }

  decrementa() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onload();
    }
  }

  modificaProdotto(id: number) {
    this.router.navigate([`productForm/${id}`]);
  }

  deleteProduct(id: number) {
    this.productSvc.deleteProduct(id).subscribe({
      next: (res) => {
        this.onload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
