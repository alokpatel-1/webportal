import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent, SidebarOrg, SidebarSection, SidebarUser, SidebarOrgConfig } from '../../shared/components/sidebar/sidebar.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SendInvitationComponent } from '../../shared/components/send-invitation/send-invitation.component';
import { UserRole } from '../../core/models/auth.model';

@Component({
    selector: 'app-management-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './management-layout.component.html',
    styleUrl: './management-layout.component.scss'
})
export class ManagementLayoutComponent implements OnInit {
    private router = inject(Router);
    private dialogService = inject(DialogService);
    private ref: DynamicDialogRef | undefined;

    shopsList: SidebarOrgConfig | null = null;
    menuOptions: SidebarSection[] = [];
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
        const allOrgs = [
            { name: 'PCMBC', role: 'Owner', initial: 'P', bgColorClass: 'bg-purple-600' },
            { name: 'Basaglar', role: 'Brand', initial: 'B', bgColorClass: 'bg-teal-500' }
        ];

        this.shopsList = {
            sectionLabel: 'YOUR ORGANIZATIONS',
            allOrgs: allOrgs,
            mainActions: [
                { label: 'Manage Members', icon: 'pi pi-users', action: 'invite' },
                { label: 'Organization Settings', icon: 'pi pi-cog', action: 'settings' }
            ],
            footerAction: { label: 'Create New Organization', icon: 'pi pi-plus', action: 'create' }
        };

        this.menuOptions = [
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
            }
        ];
        this.user = {
            name: 'Alok Patel',
            email: 'alok.patel_demo_4@livo.com',
            initial: 'A',
            bgColorClass: 'bg-purple-600'
        };
    }

    private setShopAdminConfig() {
        const allOrgs = [
            { name: 'Shop HQ', role: 'Admin', initial: 'H', bgColorClass: 'bg-orange-600' },
            { name: 'Branch East', role: 'Admin', initial: 'E', bgColorClass: 'bg-amber-600' },
            { name: 'Branch West', role: 'Admin', initial: 'W', bgColorClass: 'bg-amber-600' },
            { name: 'Branch North', role: 'Admin', initial: 'N', bgColorClass: 'bg-amber-600' },
            { name: 'Branch South', role: 'Admin', initial: 'S', bgColorClass: 'bg-amber-600' },
            { name: 'Branch South', role: 'Admin', initial: 'S', bgColorClass: 'bg-amber-600' },
            { name: 'Branch South', role: 'Admin', initial: 'S', bgColorClass: 'bg-amber-600' },
        ];

        this.shopsList = {
            sectionLabel: 'YOUR ORGANIZATIONS',
            allOrgs: allOrgs,
            mainActions: [
                { label: 'Manage Sellers', icon: 'pi pi-users', action: 'invite' },
                { label: 'Organization Settings', icon: 'pi pi-cog', action: 'settings' }
            ],
            footerAction: { label: 'Invite new seller', icon: 'pi pi-plus', action: 'invite_seller' }
        };

        this.menuOptions = [
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
        const allOrgs = [
            { name: 'My Seller Store', role: 'Seller', initial: 'S', bgColorClass: 'bg-blue-600' },
            { name: 'Second Store', role: 'Seller', initial: 'S', bgColorClass: 'bg-teal-600' }
        ];

        this.shopsList = {
            sectionLabel: 'YOUR SHOPS',
            allOrgs: allOrgs,
            mainActions: [
                { label: 'Shop Settings', icon: 'pi pi-cog', action: 'settings' }
            ],
            footerAction: { label: 'Create New Shop', icon: 'pi pi-plus', action: 'create' }
        };

        this.menuOptions = [
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

    onOrgSelected(org: SidebarOrg) {
        console.log('Switched to organization:', org.name);
        // Additional logic like fetching shop data could go here
    }

    onActionClicked(action: string) {
        console.log('Action clicked:', action);
        if (action === 'invite_seller') {
            this.openInvitationPopup();
        }
    }

    private openInvitationPopup() {
        this.ref = this.dialogService.open(SendInvitationComponent, {
            width: '600px',
            contentStyle: { overflow: 'auto', padding: '0' },
            baseZIndex: 10000,
            showHeader: false,
            styleClass: 'custom-modern-dialog',
            data: {
                role: UserRole.SELLER,
                showShops: true,
                showInviteCode: true,
                inviteCode: 'INVITE_CODE',
                availableShops: this.shopsList?.allOrgs.map(org => ({
                    id: org.name,
                    name: org.name,
                    initial: org.initial,
                    bgColorClass: org.bgColorClass
                })) || []
            }
        });

        this.ref.onClose.subscribe((result) => {
            if (result) {
                console.log('Invitation sent successfully');
            }
        });
    }
}
