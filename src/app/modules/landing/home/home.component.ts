import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    categories = [
        { name: 'Men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop', count: '1,240 Items' },
        { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop', count: '2,150 Items' },
        { name: 'Kids', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop', count: '840 Items' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop', count: '560 Items' }
    ];

    featuredProducts = [
        { name: 'Premium Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1760&auto=format&fit=crop' },
        { name: 'Designer Sneakers', price: 89.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1740&auto=format&fit=crop' },
        { name: 'Classic Denim Jacket', price: 64.99, image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=2071&auto=format&fit=crop' },
        { name: 'Luxury Leather Watch', price: 129.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2040&auto=format&fit=crop' }
    ];
}
