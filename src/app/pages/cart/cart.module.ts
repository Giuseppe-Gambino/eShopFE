import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';


@NgModule({
  declarations: [
    CartComponent,
    CheckOutComponent,
    SuccessComponent,
    FailedComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
