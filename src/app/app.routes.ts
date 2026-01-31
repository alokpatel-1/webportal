import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.routes').then(m => m.userRoutes)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./modules/super-admin/super-admin.routes').then(m => m.superAdminRoutes)
  },
  {
    path: 'shop-admin',
    loadChildren: () => import('./modules/shop-admin/shop-admin.routes').then(m => m.shopAdminRoutes)
  },
  {
    path: 'seller',
    loadChildren: () => import('./modules/seller/seller.routes').then(m => m.sellerRoutes)
  },
  { path: '**', redirectTo: 'user' }
];
