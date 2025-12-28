import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  selectedLanguage = 'en';
  currentYear = new Date().getFullYear();

  languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'it', label: 'Italiano', flag: '🇮🇹' },
    { value: 'pt', label: 'Português', flag: '🇵🇹' },
    { value: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' }
  ];

  categories = {
    shop: [
      { label: 'Men', route: '/men' },
      { label: 'Women', route: '/women' },
      { label: 'Kids', route: '/kids' },
      { label: 'Home & Living', route: '/home-living' },
      { label: 'Beauty', route: '/beauty' },
      { label: 'Studio', route: '/studio' }
    ],
    customerService: [
      { label: 'Contact Us', route: '/contact' },
      { label: 'FAQs', route: '/faqs' },
      { label: 'Track Order', route: '/track-order' },
      { label: 'Returns', route: '/returns' },
      { label: 'Shipping Info', route: '/shipping' },
      { label: 'Size Guide', route: '/size-guide' }
    ],
    about: [
      { label: 'About Us', route: '/about' },
      { label: 'Careers', route: '/careers' },
      { label: 'Press', route: '/press' },
      { label: 'Sustainability', route: '/sustainability' },
      { label: 'Investor Relations', route: '/investors' }
    ],
    legal: [
      { label: 'Terms & Conditions', route: '/terms' },
      { label: 'Privacy Policy', route: '/privacy' },
      { label: 'Cookie Policy', route: '/cookies' },
      { label: 'Accessibility', route: '/accessibility' }
    ]
  };

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
    { icon: 'pinterest', url: 'https://pinterest.com', label: 'Pinterest' }
  ];

  onLanguageChange(language: string) {
    this.selectedLanguage = language;
    // Handle language change logic here
    console.log('Language changed to:', language);
    // You can implement i18n service here
  }
}

