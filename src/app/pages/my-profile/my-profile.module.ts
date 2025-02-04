import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
