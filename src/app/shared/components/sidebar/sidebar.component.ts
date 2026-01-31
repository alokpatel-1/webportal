import { Component, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

export interface SidebarOrg {
  name: string;
  role: string;
  initial: string;
  bgColorClass: string; // e.g. 'bg-purple-600'
}

export interface SidebarLink {
  label: string;
  icon: string; // pi class
  route?: string;
  action?: string; // identifier for action
}

export interface SidebarSection {
  title?: string;
  items: SidebarLink[];
}

export interface SidebarUser {
  name: string;
  email: string;
  initial: string;
  bgColorClass: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() organizations: SidebarOrg[] = [];
  @Input() sections: SidebarSection[] = [];
  @Input() user: SidebarUser | null = null;
  @Input() collapsed = false;

  @Output() toggleContext = new EventEmitter<void>();

  @ViewChild('userMenu') userMenu!: Menu;

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const orgSwitcher = this.eRef.nativeElement.querySelector('.sidebar__org-switcher');

    if (orgSwitcher && !orgSwitcher.contains(target)) {
      this.showOrgSwitcher = false;
    }
  }

  userMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.updateMenuItems();
  }

  updateMenuItems() {
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.onProfile()
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => console.log('Navigate to settings')
      },
      {
        separator: true
      },
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout(),
        styleClass: 'logout-item'
      }
    ];

    // Add invite option if user has admin/owner role
    if (this.organizations.length > 0 && this.canInvite(this.organizations[0].role)) {
      this.userMenuItems.splice(1, 0, {
        label: 'Invite',
        icon: 'pi pi-user-plus',
        command: () => this.onInvite()
      });
    }
  }

  showOrgSwitcher = false;

  // Toggle internal collapsed state if no external control is preferred
  // or simple binding. Here we assume internal control for demo.
  toggleCollapse() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.showOrgSwitcher = false;
    }
  }

  toggleOrgSwitcher(event: Event) {
    event.stopPropagation();
    if (!this.collapsed) {
      this.showOrgSwitcher = !this.showOrgSwitcher;
    }
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    if (!this.collapsed) {
      this.userMenu.toggle(event);
      this.showOrgSwitcher = false; // Close org switcher if user menu opens
    }
  }

  onProfile() {
    console.log('Navigate to profile');
    // TODO: Implement navigation to profile
  }

  onInvite() {
    console.log('Open invite modal');
    // TODO: Implement invite functionality
  }

  onLogout() {
    console.log('Logout user');
    // TODO: Implement logout functionality
  }

  canInvite(role: string): boolean {
    // Show invite option for Owner, Brand, or any admin role
    return role === 'Owner' || role === 'Brand' || role.toLowerCase().includes('admin');
  }
}
