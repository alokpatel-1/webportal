import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-shop-admin-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './shop-admin-dashboard.component.html',
  styleUrl: './shop-admin-dashboard.component.scss'
})
export class ShopAdminDashboardComponent { }
