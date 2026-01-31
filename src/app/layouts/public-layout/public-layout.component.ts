import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductFilterComponent, FilterSection } from '../../shared/components/product-filter/product-filter.component';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, TopBarComponent, FooterComponent, ProductFilterComponent],
    templateUrl: './public-layout.component.html',
    styleUrl: './public-layout.component.scss'
})
export class PublicLayoutComponent implements OnInit {
    private router = inject(Router);

    filterSections: FilterSection[] = [
        {
            id: 'price',
            label: 'Price Range',
            type: 'range',
            collapsed: false,
            rangeConfig: { min: 0, max: 1000, format: 'currency' }
        },
        {
            id: 'category',
            label: 'Category',
            type: 'checkbox',
            collapsed: false,
            options: [
                { label: 'Electronics', value: 'electronics', count: 156 },
                { label: 'Clothing', value: 'clothing', count: 89 },
                { label: 'Home & Garden', value: 'home', count: 45 },
                { label: 'Sports', value: 'sports', count: 32 }
            ]
        },
        {
            id: 'brand',
            label: 'Brand',
            type: 'checkbox',
            collapsed: false,
            options: [
                { label: 'Nike', value: 'nike', count: 24 },
                { label: 'Adidas', value: 'adidas', count: 18 },
                { label: 'Puma', value: 'puma', count: 12 },
                { label: 'Reebok', value: 'reebok', count: 9 }
            ]
        }
    ];

    showFilter = false;

    ngOnInit() {
        this.checkFilterVisibility();
        this.router.events.subscribe(() => {
            this.checkFilterVisibility();
        });
    }

    private checkFilterVisibility() {
        this.showFilter = this.router.url.includes('/products');
    }

    onFilterChange(filters: any) {
        console.log('Public filter change:', filters);
        // TODO: Implement shared filtering logic or query param updates
    }
}
