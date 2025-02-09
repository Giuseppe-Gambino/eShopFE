import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { SuccessComponent } from './success/success.component';
import { FailedComponent } from './failed/failed.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'faild', component: FailedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
