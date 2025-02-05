import { iPageAble, Pageable } from './../../interfaces/i-page-able';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { iProduct } from '../../interfaces/i-product';
import { iCategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
})
export class ShopPageComponent implements OnInit {
  product!: iProduct[];
  categoryArr!: iCategory[];
  minPriceArr: number[] = [50, 70, 100, 150, 200, 250, 300, 350, 400, 450, 500];
  maxPriceArr: number[] = [50, 70, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  // pageable
  pageable!: iPageAble;
  currentPage: number = 0;
  // filtri
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;

  constructor(
    private prodSvc: ProductsService,
    private categorySvc: CategoryService
  ) {}

  ngOnInit(): void {
    this.onLoad();
    this.loadCategory();
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

  loadCategory() {
    this.categorySvc.getAllCategory().subscribe((result) => {
      this.categoryArr = result;
    });
  }
}
