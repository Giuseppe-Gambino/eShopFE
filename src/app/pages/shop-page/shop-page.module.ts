import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopPageComponent } from './shop-page.component';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    ShopPageComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ShopPageRoutingModule
  ]
})
export class ShopPageModule { }
