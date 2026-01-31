import { Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './super-admin-layout.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';

export const superAdminRoutes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      { path: '', component: SuperAdminDashboardComponent }
    ]
  }
];
