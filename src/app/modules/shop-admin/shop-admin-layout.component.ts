import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-shop-admin-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './shop-admin-layout.component.html',
  styleUrl: './shop-admin-layout.component.scss'
})
export class ShopAdminLayoutComponent {
  organizations = [
    { name: 'Shop HQ', role: 'Admin', initial: 'H', bgColorClass: 'bg-orange-600' }
  ];

  sections = [
    {
      title: 'Management',
      items: [
        { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/shop-admin' },
        { label: 'Sellers', icon: 'pi pi-users', route: '/shop-admin/sellers' },
        { label: 'Approvals', icon: 'pi pi-check-square', route: '/shop-admin/approvals' }
      ]
    }
  ];

  user = {
    name: 'Admin User',
    email: 'admin@shop.com',
    initial: 'A',
    bgColorClass: 'bg-orange-500'
  };
}
