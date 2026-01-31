import { Routes } from '@angular/router';
import { ShopAdminLayoutComponent } from './shop-admin-layout.component';
import { ShopAdminDashboardComponent } from './shop-admin-dashboard.component';

export const shopAdminRoutes: Routes = [
  {
    path: '',
    component: ShopAdminLayoutComponent,
    children: [
      { path: '', component: ShopAdminDashboardComponent }
    ]
  }
];
