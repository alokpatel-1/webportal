import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const landingRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'shope-admin-onboard',
        loadComponent: () => import('../../auth/shope-admin-onboard/shope-admin-onboard.component').then(m => m.ShopeAdminOnboardComponent)
    }
];
