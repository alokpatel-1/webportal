import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-super-admin-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './super-admin-dashboard.component.html',
  styleUrl: './super-admin-dashboard.component.scss'
})
export class SuperAdminDashboardComponent { }
