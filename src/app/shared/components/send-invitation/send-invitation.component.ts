import { Component, Input, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserRole } from '../../../core/models/auth.model';

export interface Shop {
    id: string;
    name: string;
    initial: string;
    bgColorClass: string;
}

@Component({
    selector: 'app-send-invitation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './send-invitation.component.html',
    styleUrl: './send-invitation.component.scss'
})
export class SendInvitationComponent implements OnInit {
    private fb = inject(FormBuilder);
    private config = inject(DynamicDialogConfig, { optional: true });
    public ref = inject(DynamicDialogRef, { optional: true });

    // Internal state signals (initialized from inputs or dialog config)
    role = signal<UserRole>(UserRole.SELLER);
    showShops = signal<boolean>(false);
    showInviteCode = signal<boolean>(false);
    inviteCode = signal<string>('');
    availableShops = signal<Shop[]>([]);
    searchTerm = signal<string>('');

    // Computed filtered shops
    filteredShops = computed(() => {
        const term = this.searchTerm().toLowerCase();
        return this.availableShops().filter(shop =>
            shop.name.toLowerCase().includes(term)
        );
    });

    @Input('role') set roleInput(val: UserRole) { this.role.set(val); }
    @Input('showShops') set showShopsInput(val: boolean) { this.showShops.set(val); }
    @Input('showInviteCode') set showInviteCodeInput(val: boolean) { this.showInviteCode.set(val); }
    @Input('inviteCode') set inviteCodeInput(val: string) { this.inviteCode.set(val); }
    @Input('availableShops') set availableShopsInput(val: Shop[]) { this.availableShops.set(val); }

    invitationForm: FormGroup;
    isLoading = signal(false);
    isSubmitted = signal(false);

    constructor() {
        this.invitationForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            shops: [[]],
            inviteCode: [{ value: '', disabled: true }]
        });
    }

    ngOnInit() {
        // If opened as a dialog, take data from config
        if (this.config?.data) {
            const data = this.config.data;
            if (data.role) this.role.set(data.role);
            if (data.showShops !== undefined) this.showShops.set(data.showShops);
            if (data.showInviteCode !== undefined) this.showInviteCode.set(data.showInviteCode);
            if (data.inviteCode) this.inviteCode.set(data.inviteCode);
            if (data.availableShops) this.availableShops.set(data.availableShops);
        }

        // Handle initial values
        if (this.showInviteCode()) {
            this.invitationForm.patchValue({ inviteCode: this.inviteCode() });
        }

        if (this.showShops()) {
            this.invitationForm.get('shops')?.setValidators([Validators.required, Validators.minLength(1)]);
        }
    }

    isSelected(shopId: string): boolean {
        const selectedShops = this.invitationForm.get('shops')?.value || [];
        return selectedShops.includes(shopId);
    }

    toggleShop(shopId: string) {
        let selectedShops = [...(this.invitationForm.get('shops')?.value || [])];
        if (selectedShops.includes(shopId)) {
            selectedShops = selectedShops.filter(id => id !== shopId);
        } else {
            selectedShops.push(shopId);
        }
        this.invitationForm.patchValue({ shops: selectedShops });
        this.invitationForm.get('shops')?.markAsTouched();
    }

    selectAll() {
        const allIds = this.availableShops().map(s => s.id);
        this.invitationForm.patchValue({ shops: allIds });
        this.invitationForm.get('shops')?.markAsTouched();
    }

    deselectAll() {
        this.invitationForm.patchValue({ shops: [] });
        this.invitationForm.get('shops')?.markAsTouched();
    }

    get roleLabel(): string {
        return this.role() === UserRole.SELLER ? 'Seller' : 'Shop Admin';
    }

    onSubmit() {
        if (this.invitationForm.invalid) {
            this.invitationForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);

        // Simulate API call
        setTimeout(() => {
            this.isLoading.set(false);
            this.isSubmitted.set(true);
            console.log('Invitation sent:', {
                ...this.invitationForm.value,
                role: this.role(),
                inviteCode: this.inviteCode()
            });

            // If in dialog, close after a short delay
            if (this.ref) {
                setTimeout(() => {
                    this.ref?.close(true);
                }, 2000);
            }
        }, 1500);
    }

    closeDialog() {
        this.ref?.close();
    }

    resetForm() {
        this.isSubmitted.set(false);
        this.invitationForm.reset({
            email: '',
            shops: [],
            inviteCode: this.inviteCode()
        });
    }
}
