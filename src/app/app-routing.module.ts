import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guards/guest.guard';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'myProfile',
    loadChildren: () =>
      import('./pages/my-profile/my-profile.module').then(
        (m) => m.MyProfileModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'shopPage',
    loadChildren: () =>
      import('./pages/shop-page/shop-page.module').then(
        (m) => m.ShopPageModule
      ),
  },
  {
    path: 'adminPage',
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'sellerDashboard',
    loadChildren: () =>
      import('./pages/seller-dashboard/seller-dashboard.module').then(
        (m) => m.SellerDashboardModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'productForm',
    loadChildren: () =>
      import('./pages/product-form/product-form.module').then(
        (m) => m.ProductFormModule
      ),
  },
  {
    path: 'productForm/:id',
    loadChildren: () =>
      import('./pages/product-form/product-form.module').then(
        (m) => m.ProductFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
