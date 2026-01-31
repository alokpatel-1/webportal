import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.scss'
})
export class SellerLayoutComponent {
  organizations = [
    { name: 'My Seller Store', role: 'Seller', initial: 'S', bgColorClass: 'bg-blue-600' }
  ];

  sections = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', route: '/seller' },
        { label: 'Orders', icon: 'pi pi-shopping-cart', route: '/seller/orders' },
        { label: 'Products', icon: 'pi pi-tag', route: '/seller/products' }
      ]
    }
  ];

  user = {
    name: 'Seller User',
    email: 'seller@example.com',
    initial: 'S',
    bgColorClass: 'bg-blue-500'
  };
}
