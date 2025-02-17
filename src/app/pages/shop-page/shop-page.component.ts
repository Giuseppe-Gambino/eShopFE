import { iPageAble, Pageable } from './../../interfaces/i-page-able';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { iProduct } from '../../interfaces/i-product';
import { iCategory } from '../../interfaces/i-category';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
})
export class ShopPageComponent implements OnInit {
  product!: iProduct[];
  categoryArr!: iCategory[];
  length: number = 0;
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
    private categorySvc: CategoryService,
    private cartSvc: CartService
  ) {}

  ngOnInit(): void {
    this.prodSvc.category$.subscribe((res) => {
      this.category = res;
    });

    this.onLoad();
    this.loadCategory();

    this.cartSvc.cart$.subscribe({
      next: (result) => {
        if (result) {
          this.length = result;
        }
      },
      error: (err) => {
        console.error('Errore nel caricamento del carrello', err);
      },
    });
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
      .subscribe({
        next: (result) => {
          this.pageable = result;
          this.product = result.content as iProduct[];
        },
        error: (err) => {
          console.error('Errore nel caricamento dei prodotti', err);
        },
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

  addToCart(productId: number, event: Event) {
    event.stopPropagation();

    this.cartSvc
      .getCart()
      .pipe(take(1))
      .subscribe((cart) => {
        const productAlreadyInCart = cart.cartItems.some(
          (item) => item.product.id === productId
        );

        this.cartSvc.addProductToCart(productId, 1).subscribe({
          next: () => {
            if (!productAlreadyInCart) {
              this.cartSvc.updateLength(this.length + 1);
            }
          },
          error: (err) => {
            console.error("Errore nell'aggiunta al carrello", err);
          },
        });
      });
  }
}
