import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UserRole } from '../../core/models/auth.model';

export const landingRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'onboard-admin',
        loadComponent: () => import('../../auth/shope-admin-onboard/shope-admin-onboard.component').then(m => m.ShopeAdminOnboardComponent),
        data: { role: UserRole.SHOP_ADMIN }
    },
    {
        path: 'onboard-seller',
        loadComponent: () => import('../../auth/shope-admin-onboard/shope-admin-onboard.component').then(m => m.ShopeAdminOnboardComponent),
        data: { role: UserRole.SELLER }
    }
];
