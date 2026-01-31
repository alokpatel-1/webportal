import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, DataViewModule, TagModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    products = [
        { name: 'Bamboo Watch', price: 65, category: 'Accessories', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099' },
        { name: 'Black Watch', price: 72, category: 'Accessories', inventoryStatus: 'LOWSTOCK', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2040' },
        { name: 'Blue Band', price: 79, category: 'Fitness', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088' },
        { name: 'Blue T-Shirt', price: 29, category: 'Clothing', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1760' },
        { name: 'Bracelet', price: 15, category: 'Accessories', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1573408302382-90cd444b25ca?q=80&w=2070' },
        { name: 'Brown Purse', price: 120, category: 'Accessories', inventoryStatus: 'OUTOFSTOCK', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069' },
        { name: 'Chakra Bracelet', price: 32, category: 'Accessories', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1770' },
        { name: 'Galaxy Earrings', price: 34, category: 'Accessories', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1535633302704-c02f4f7d023e?q=80&w=1770' },
        { name: 'Game Controller', price: 99, category: 'Electronics', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?q=80&w=1760' },
        { name: 'Gaming Set', price: 299, category: 'Electronics', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070' },
        { name: 'Gold Phone Case', price: 24, category: 'Accessories', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1887' },
        { name: 'Green Earphones', price: 89, category: 'Electronics', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1583394838336-acd9929a5f91?q=80&w=1887' },
        { name: 'Green T-Shirt', price: 49, category: 'Clothing', inventoryStatus: 'INSTOCK', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1760' }
    ];

    getSeverity(product: any) {
        switch (product.inventoryStatus) {
            case 'INSTOCK': return 'success';
            case 'LOWSTOCK': return 'warning';
            case 'OUTOFSTOCK': return 'danger';
            default: return undefined;
        }
    }
}
