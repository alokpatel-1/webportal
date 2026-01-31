import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-super-admin-layout',
  standalone: true,
  imports: [RouterModule, TopBarComponent, FooterComponent, SidebarComponent],
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.scss'
})
export class SuperAdminLayoutComponent {
  organizations = [
    { name: 'PCMBC', role: 'Owner', initial: 'P', bgColorClass: 'bg-purple-600' },
    { name: 'Basaglar', role: 'Brand', initial: 'B', bgColorClass: 'bg-teal-500' }
  ];

  sections = [
    {
      title: 'Persona',
      items: [
        { label: 'Personas', icon: 'pi pi-user', route: '/super-admin/personas' },
        { label: 'Create Persona', icon: 'pi pi-plus', route: '/super-admin/create-persona' }
      ]
    },
    {
      title: 'Knowledge',
      items: [
        { label: 'Knowledge bases', icon: 'pi pi-book', route: '/super-admin/knowledge-bases' },
        { label: 'Add Knowledge base', icon: 'pi pi-plus', route: '/super-admin/add-knowledge-base' }
      ]
    },
    {
      title: 'Review',
      items: [
        { label: 'Sessions', icon: 'pi pi-hourglass', route: '/super-admin/sessions' },
        { label: 'Start new review', icon: 'pi pi-plus', route: '/super-admin/start-review' }
      ]
    },
    {
      title: 'Deployments',
      items: [
        { label: 'Manage Deployments', icon: 'pi pi-rocket', route: '/super-admin/deployments' },
        { label: 'Create Deployment', icon: 'pi pi-plus', route: '/super-admin/create-deployment' }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { label: 'Analytics', icon: 'pi pi-chart-bar', route: '/super-admin/analytics' }
      ]
    },
    {
      title: 'Billing',
      items: [
        { label: 'Billing', icon: 'pi pi-wallet', route: '/super-admin/billing' }
      ]
    }
  ];

  user = {
    name: 'Alok Patel',
    email: 'alok.patel_demo_4@openmart.com',
    initial: 'A',
    bgColorClass: 'bg-purple-600'
  };
}
