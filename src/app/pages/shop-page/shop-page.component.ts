import { iPageAble, Pageable } from './../../interfaces/i-page-able';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { iProduct } from '../../interfaces/i-product';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
})
export class ShopPageComponent implements OnInit {
  product!: iProduct[];

  // pageable
  pageable!: iPageAble;
  currentPage: number = 0;
  // filtri
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;

  constructor(private prodSvc: ProductsService) {}

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.prodSvc
      .getProductsPage(
        this.currentPage,
        this.name,
        this.category,
        this.minPrice,
        this.maxPrice
      )
      .subscribe((result) => {
        this.pageable = result;
        this.product = result.content;
        console.log(result);

        console.log(this.product);
      });
  }

  incrementa() {
    if (
      this.currentPage < this.pageable?.totalPages &&
      this.currentPage + 1 != this.pageable?.totalPages
    ) {
      this.currentPage++;
      this.onLoad();
    }
  }

  decrementa() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.onLoad();
    }
  }

  filter() {
    this.currentPage = 0;
    this.onLoad();
  }
}
