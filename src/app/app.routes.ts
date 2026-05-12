import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('./modules/landing/landing.routes').then(m => m.landingRoutes)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.routes').then(m => m.userRoutes)
  },
  {
    path: 'super-admin',
    loadChildren: () => import('./modules/super-admin/super-admin.routes').then(m => m.superAdminRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/shops-admin/shop-admin.routes').then(m => m.shopAdminRoutes)
  },
  {
    path: 'seller',
    loadChildren: () => import('./modules/seller/seller.routes').then(m => m.sellerRoutes)
  },
  { path: '**', redirectTo: '' }
];
