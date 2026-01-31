import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductFilterComponent, FilterSection } from '../../shared/components/product-filter/product-filter.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, ProductFilterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {
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
    },
    {
      id: 'rating',
      label: 'Rating',
      type: 'checkbox',
      collapsed: true,
      options: [
        { label: '4 Stars & Up', value: '4_plus', count: 120 },
        { label: '3 Stars & Up', value: '3_plus', count: 45 }
      ]
    }
  ];

  onFilterChange(filters: any) {
    console.log('Filters updated:', filters);
    // Logic to pass filters to the child route (e.g. via shared service or query params)
  }
}
