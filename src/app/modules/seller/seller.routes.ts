import { Routes } from '@angular/router';
import { ManagementLayoutComponent } from '../../layouts/management-layout/management-layout.component';
import { SellerDashboardComponent } from './seller-dashboard.component';

export const sellerRoutes: Routes = [
  {
    path: '',
    component: ManagementLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent }
    ]
  }
];
