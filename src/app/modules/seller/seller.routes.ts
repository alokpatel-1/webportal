import { Routes } from '@angular/router';
import { SellerLayoutComponent } from './seller-layout.component';
import { SellerDashboardComponent } from './seller-dashboard.component';

export const sellerRoutes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent }
    ]
  }
];
