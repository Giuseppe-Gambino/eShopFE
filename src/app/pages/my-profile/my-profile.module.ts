import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyProfileComponent, OrderHistoryComponent],
  imports: [CommonModule, MyProfileRoutingModule, ReactiveFormsModule],
})
export class MyProfileModule {}
