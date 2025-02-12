import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { FormsModule } from '@angular/forms';
import { FormProductComponent } from './form-product/form-product.component';

@NgModule({
  declarations: [
    SellerDashboardComponent,
    ManageProductsComponent,
    FormProductComponent,
  ],
  imports: [CommonModule, SellerDashboardRoutingModule, FormsModule],
})
export class SellerDashboardModule {}
