import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModalComponent, AuthMode } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthModalComponent],
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

  // Auth Modal State
  showAuthModal = false;
  authMode: AuthMode = AuthMode.Login;

  openAuthModal() {
    this.authMode = AuthMode.Login;
    this.showAuthModal = true;
  }

  activeMegaMenu: string | null = null;

  megaMenuItems = [
    {
      id: 'men',
      label: 'Men',
      columns: [
        {
          title: 'Topwear',
          items: [
            { label: 'T-Shirts', route: '/men/t-shirts' },
            { label: 'Casual Shirts', route: '/men/casual-shirts' },
            { label: 'Formal Shirts', route: '/men/formal-shirts' },
            { label: 'Sweatshirts', route: '/men/sweatshirts' },
            { label: 'Jackets', route: '/men/jackets' }
          ]
        },
        {
          title: 'Bottomwear',
          items: [
            { label: 'Jeans', route: '/men/jeans' },
            { label: 'Casual Trousers', route: '/men/casual-trousers' },
            { label: 'Formal Trousers', route: '/men/formal-trousers' },
            { label: 'Shorts', route: '/men/shorts' }
          ]
        },
        {
          title: 'Footwear',
          items: [
            { label: 'Casual Shoes', route: '/men/casual-shoes' },
            { label: 'Sports Shoes', route: '/men/sports-shoes' },
            { label: 'Formal Shoes', route: '/men/formal-shoes' },
            { label: 'Sneakers', route: '/men/sneakers' }
          ]
        }
      ]
    },
    {
      id: 'women',
      label: 'Women',
      columns: [
        {
          title: 'Indian & Fusion Wear',
          items: [
            { label: 'Kurtas & Suits', route: '/women/kurtas' },
            { label: 'Kurtis, Tunics & Tops', route: '/women/kurtis' },
            { label: 'Sarees', route: '/women/sarees' },
            { label: 'Ethnic Wear', route: '/women/ethnic' }
          ]
        },
        {
          title: 'Western Wear',
          items: [
            { label: 'Dresses', route: '/women/dresses' },
            { label: 'Tops', route: '/women/tops' },
            { label: 'T-Shirts', route: '/women/t-shirts' },
            { label: 'Jeans', route: '/women/jeans' }
          ]
        },
        {
          title: 'Footwear',
          items: [
            { label: 'Flats', route: '/women/flats' },
            { label: 'Casual Shoes', route: '/women/casual-shoes' },
            { label: 'Heels', route: '/women/heels' },
            { label: 'Boots', route: '/women/boots' }
          ]
        }
      ]
    },
    {
      id: 'kids',
      label: 'Kids',
      columns: [
        {
          title: 'Boys Clothing',
          items: [
            { label: 'T-Shirts', route: '/kids/boys-tshirts' },
            { label: 'Shirts', route: '/kids/boys-shirts' },
            { label: 'Shorts', route: '/kids/boys-shorts' },
            { label: 'Jeans', route: '/kids/boys-jeans' }
          ]
        },
        {
          title: 'Girls Clothing',
          items: [
            { label: 'Dresses', route: '/kids/girls-dresses' },
            { label: 'Tops', route: '/kids/girls-tops' },
            { label: 'T-Shirts', route: '/kids/girls-tshirts' },
            { label: 'Clothing Sets', route: '/kids/girls-sets' }
          ]
        },
        {
          title: 'Footwear',
          items: [
            { label: 'Casual Shoes', route: '/kids/casual-shoes' },
            { label: 'Sports Shoes', route: '/kids/sports-shoes' },
            { label: 'School Shoes', route: '/kids/school-shoes' }
          ]
        }
      ]
    },
    {
      id: 'other',
      label: 'Other',
      columns: [
        {
          title: 'Home & Living',
          items: [
            { label: 'Bed Linen', route: '/home/bed-linen' },
            { label: 'Flooring', route: '/home/flooring' },
            { label: 'Bath', route: '/home/bath' },
            { label: 'Lamps & Lighting', route: '/home/lighting' }
          ]
        },
        {
          title: 'Beauty',
          items: [
            { label: 'Makeup', route: '/beauty/makeup' },
            { label: 'Skincare', route: '/beauty/skincare' },
            { label: 'Haircare', route: '/beauty/haircare' },
            { label: 'Fragrances', route: '/beauty/fragrances' }
          ]
        },
        {
          title: 'Gadgets',
          items: [
            { label: 'Smart Wearables', route: '/gadgets/wearables' },
            { label: 'Audio', route: '/gadgets/audio' },
            { label: 'Mobile Accessories', route: '/gadgets/accessories' }
          ]
        }
      ]
    }
  ];
}
