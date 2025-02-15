import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  { path: '', component: SellerDashboardComponent },
  { path: 'manageProduct', component: ManageProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerDashboardRoutingModule {}
