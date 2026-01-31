import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() organizations: SidebarOrg[] = [];
  @Input() sections: SidebarSection[] = [];
  @Input() user: SidebarUser | null = null;
  @Input() collapsed = false;

  @Output() toggleContext = new EventEmitter<void>();

  // Toggle internal collapsed state if no external control is preferred
  // or simple binding. Here we assume internal control for demo.
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
