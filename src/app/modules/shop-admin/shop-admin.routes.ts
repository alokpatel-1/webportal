import { Routes } from '@angular/router';
import { ManagementLayoutComponent } from '../../layouts/management-layout/management-layout.component';
import { ShopAdminDashboardComponent } from './shop-admin-dashboard.component';

export const shopAdminRoutes: Routes = [
  {
    path: '',
    component: ManagementLayoutComponent,
    children: [
      { path: '', component: ShopAdminDashboardComponent }
    ]
  }
];
