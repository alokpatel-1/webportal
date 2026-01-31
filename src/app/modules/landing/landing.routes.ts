import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';

export const landingRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'products',
        component: ProductListComponent
    }
];
