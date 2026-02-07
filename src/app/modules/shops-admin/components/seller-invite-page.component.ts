import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendInvitationComponent, Shop } from '../../../shared/components/send-invitation/send-invitation.component';
import { UserRole } from '../../../core/models/auth.model';

@Component({
    selector: 'app-seller-invite-page',
    standalone: true,
    imports: [CommonModule, SendInvitationComponent],
    templateUrl: './seller-invite-page.component.html',
    styleUrl: './seller-invite-page.component.scss'
})
export class SellerInvitePageComponent {
    protected UserRole = UserRole;

    // Hardcoded data as requested
    shops = signal<Shop[]>([
        { id: '1', name: 'Livo Electronics - Downtown' },
        { id: '2', name: 'Livo Fashion - West Mall' },
        { id: '3', name: 'Livo Home - South Plaza' }
    ]);

    generatedInviteCode = signal<string>('INV-' + Math.random().toString(36).substring(2, 8).toUpperCase());
}
