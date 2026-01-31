import { Routes } from '@angular/router';
import { ManagementLayoutComponent } from '../../layouts/management-layout/management-layout.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';

export const superAdminRoutes: Routes = [
  {
    path: '',
    component: ManagementLayoutComponent,
    children: [
      { path: '', component: SuperAdminDashboardComponent }
    ]
  }
];
