import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '../../layouts/public-layout/public-layout.component';
import { UserDashboardComponent } from './user-dashboard.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: UserDashboardComponent }
    ]
  }
];
