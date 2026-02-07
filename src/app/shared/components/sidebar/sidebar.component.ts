import { Component, Input, Output, EventEmitter, ViewChild, inject, computed, OnInit, OnChanges, SimpleChanges, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/auth.model';

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

export interface SidebarAction {
  label: string;
  icon: string;
  action: string;
}

export interface SidebarOrgConfig {
  sectionLabel: string;
  allOrgs: SidebarOrg[];
  mainActions: SidebarAction[];
  footerAction: SidebarAction;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges {
  private authService = inject(AuthService);

  @Input() shopsList: SidebarOrgConfig | null = null;
  @Input() menuOptions: SidebarSection[] = [];
  @Input() user: SidebarUser | null = null;
  @Input() collapsed = false;

  @Output() actionClicked = new EventEmitter<string>();
  @Output() orgSelected = new EventEmitter<SidebarOrg>();

  activeOrg: SidebarOrg | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shopsList'] && this.shopsList && this.shopsList.allOrgs.length > 0) {
      this.activeOrg = this.shopsList.allOrgs[0];
    }
  }

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
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.actionClicked.emit('Profile')
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.actionClicked.emit('Settings')
      },
      {
        separator: true
      },
      {
        label: 'Sign out',
        icon: 'pi pi-sign-out',
        command: () => this.actionClicked.emit('Logout'),
        styleClass: 'logout-item'
      }
    ];
  }

  showOrgSwitcher = false;

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
      this.showOrgSwitcher = false;
    }
  }
}
