import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  showUserMenu = false;

  userMenuItems = [
    { label: 'Profile', icon: 'pi pi-user', route: '/user/profile' },
    { label: 'Addresses', icon: 'pi pi-map-marker', route: '/user/addresses' },
    { label: 'Orders', icon: 'pi pi-shopping-bag', route: '/user/orders' },
    { label: 'Wishlist', icon: 'pi pi-heart', route: '/user/wishlist' },
    { label: 'Coupons', icon: 'pi pi-ticket', route: '/user/coupons' }
  ];

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
