import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SellerDashboardComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SellerDashboardModule {}
