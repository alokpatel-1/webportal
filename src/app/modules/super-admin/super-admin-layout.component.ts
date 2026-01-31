import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent, SidebarItem } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-super-admin-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.scss'
})
export class SuperAdminLayoutComponent {
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', route: '/super-admin' }
  ];
}
