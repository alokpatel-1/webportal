import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-seller-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.scss'
})
export class SellerLayoutComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', route: '/seller' }
  ];
}
