import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent, SidebarOrg, SidebarSection, SidebarUser } from '../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-management-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './management-layout.component.html',
    styleUrl: './management-layout.component.scss'
})
export class ManagementLayoutComponent implements OnInit {
    private router = inject(Router);

    organizations: SidebarOrg[] = [];
    sections: SidebarSection[] = [];
    user: SidebarUser | null = null;

    ngOnInit() {
        this.configureLayout();
        this.router.events.subscribe(() => {
            this.configureLayout();
        });
    }

    private configureLayout() {
        const url = this.router.url;

        if (url.startsWith('/super-admin')) {
            this.setSuperAdminConfig();
        } else if (url.startsWith('/shop-admin')) {
            this.setShopAdminConfig();
        } else if (url.startsWith('/seller')) {
            this.setSellerConfig();
        }
    }

    private setSuperAdminConfig() {
        this.organizations = [
            { name: 'PCMBC', role: 'Owner', initial: 'P', bgColorClass: 'bg-purple-600' },
            { name: 'Basaglar', role: 'Brand', initial: 'B', bgColorClass: 'bg-teal-500' }
        ];
        this.sections = [
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
        this.user = {
            name: 'Alok Patel',
            email: 'alok.patel_demo_4@openmart.com',
            initial: 'A',
            bgColorClass: 'bg-purple-600'
        };
    }

    private setShopAdminConfig() {
        this.organizations = [
            { name: 'Shop HQ', role: 'Admin', initial: 'H', bgColorClass: 'bg-orange-600' }
        ];
        this.sections = [
            {
                title: 'Management',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/shop-admin' },
                    { label: 'Sellers', icon: 'pi pi-users', route: '/shop-admin/sellers' },
                    { label: 'Approvals', icon: 'pi pi-check-square', route: '/shop-admin/approvals' }
                ]
            }
        ];
        this.user = {
            name: 'Admin User',
            email: 'admin@shop.com',
            initial: 'A',
            bgColorClass: 'bg-orange-500'
        };
    }

    private setSellerConfig() {
        this.organizations = [
            { name: 'My Seller Store', role: 'Seller', initial: 'S', bgColorClass: 'bg-blue-600' }
        ];
        this.sections = [
            {
                title: 'Main',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-home', route: '/seller' },
                    { label: 'Orders', icon: 'pi pi-shopping-cart', route: '/seller/orders' },
                    { label: 'Products', icon: 'pi pi-tag', route: '/seller/products' }
                ]
            }
        ];
        this.user = {
            name: 'Seller User',
            email: 'seller@example.com',
            initial: 'S',
            bgColorClass: 'bg-blue-500'
        };
    }
}
