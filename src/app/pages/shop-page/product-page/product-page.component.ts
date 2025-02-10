import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { iProduct } from '../../../interfaces/i-product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { iUser } from '../../../interfaces/i-user';
import { switchMap } from 'rxjs';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product!: iProduct;
  imgPreview!: string;
  reseller!: iUser;
  length: number = 0;

  storicoPrezzi: any;

  count: number = 1;

  constructor(
    private productSvc: ProductsService,
    private userSvc: UserService,
    private cartSvc: CartService,
    private route: ActivatedRoute
  ) {}

  chartOptions: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productSvc
      .getProductById(parseInt(id))
      .pipe(
        switchMap((product) => {
          this.product = product;
          this.imgPreview = product.imageUrls[0];
          this.storicoPrezzi = product.priceHistory;
          console.log(this.storicoPrezzi);

          this.grafico();
          console.log(product);

          return this.userSvc.getById(product.resellerId);
        })
      )
      .subscribe((reseller) => {
        this.reseller = reseller;
        console.log(reseller);
      });

    this.cartSvc.cart$.subscribe((result) => {
      if (result) {
        this.length = result;
      }
    });
  }

  grafico() {
    // Esempio di dati con date: prezzo
    const priceHistory = this.storicoPrezzi;

    const labels = Object.keys(priceHistory);
    const data = Object.values(priceHistory);

    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: labels },
      yAxis: { type: 'value' },
      series: [
        {
          data,
          type: 'line',
          smooth: true,
        },
      ],
    };
  }

  imgSwitch(img: string) {
    this.imgPreview = img;
  }

  increase() {
    this.count++;
  }

  decrease() {
    if (this.count > 1) {
      this.count--;
    }
  }

  addToCart() {
    this.cartSvc.addProductToCart(this.product.id, this.count).subscribe({
      next: () => {
        this.cartSvc.updateLength(this.length + 1);
      },
      error: (err) => {
        console.error('Errore nell aggiunta al carrello', err);
      },
    });
  }
}
