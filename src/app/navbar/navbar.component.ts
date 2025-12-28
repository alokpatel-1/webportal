import { Component, HostListener, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('profileDropdownWrapper', { static: false }) profileDropdownWrapper!: ElementRef;

  private authService = inject(AuthService);

  bagItemCount = 1;
  showProfileDropdown = false;

  // Use signals from auth service
  isLoggedIn = this.authService.isLoggedIn;
  userName = this.authService.userName;
  userPhone = this.authService.userPhone;
  user = this.authService.user;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.profileDropdownWrapper && !this.profileDropdownWrapper.nativeElement.contains(event.target)) {
      this.showProfileDropdown = false;
    }
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  onLogin() {
    this.showProfileDropdown = false;
    // Navigation is handled by routerLink in template
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.showProfileDropdown = false;
  }
}

