import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { iProduct } from '../../../interfaces/i-product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { iUser } from '../../../interfaces/i-user';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product!: iProduct;
  imgPreview!: string;
  reseller!: iUser;

  count: number = 1;

  constructor(
    private productSvc: ProductsService,
    private userSvc: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.productSvc
      .getProductById(parseInt(id))
      .pipe(
        switchMap((product) => {
          this.product = product;
          this.imgPreview = product.imageUrls[0];
          console.log(product);

          return this.userSvc.getById(product.resellerId);
        })
      )
      .subscribe((reseller) => {
        this.reseller = reseller;
        console.log(reseller);
      });
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
}
