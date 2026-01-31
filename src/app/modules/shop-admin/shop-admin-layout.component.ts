import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-shop-admin-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './shop-admin-layout.component.html',
  styleUrl: './shop-admin-layout.component.scss'
})
export class ShopAdminLayoutComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', route: '/shop-admin' }
  ];
}
