import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent { }
