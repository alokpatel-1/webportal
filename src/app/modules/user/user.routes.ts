import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { UserDashboardComponent } from './user-dashboard.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserDashboardComponent }
    ]
  }
];
