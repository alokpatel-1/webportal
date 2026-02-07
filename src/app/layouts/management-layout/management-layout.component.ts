import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent, SidebarOrg, SidebarSection, SidebarUser, SidebarOrgConfig } from '../../shared/components/sidebar/sidebar.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SendInvitationComponent } from '../../shared/components/send-invitation/send-invitation.component';
import { UserRole } from '../../core/models/auth.model';
import { SidebarAction, SUPER_ADMIN_CONFIG, SHOP_ADMIN_CONFIG, SELLER_CONFIG, RoleLayoutConfig } from '../../core/models/livo.util.model';

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
            this.applyConfig(SUPER_ADMIN_CONFIG);
        } else if (url.startsWith('/shop-admin')) {
            this.applyConfig(SHOP_ADMIN_CONFIG);
        } else if (url.startsWith('/seller')) {
            this.applyConfig(SELLER_CONFIG);
        }
    }

    private applyConfig(config: RoleLayoutConfig) {
        this.shopsList = config.shopsList;
        this.menuOptions = config.menuOptions;
        this.user = config.user;
    }

    onOrgSelected(org: SidebarOrg) {
        console.log('Switched to organization:', org.name);
    }

    onActionClicked(action: string) {
        console.log('Action clicked:', action);
        if (action === SidebarAction.INVITE_SELLER) {
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
