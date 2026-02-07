import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../../../core/models/auth.model';

export interface Shop {
    id: string;
    name: string;
}

@Component({
    selector: 'app-send-invitation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './send-invitation.component.html',
    styleUrl: './send-invitation.component.scss'
})
export class SendInvitationComponent {
    private fb = inject(FormBuilder);

    // Inputs using signals
    role = input.required<UserRole>();
    showShops = input<boolean>(false);
    showInviteCode = input<boolean>(false);
    inviteCode = input<string>('');
    availableShops = input<Shop[]>([]);

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
        // Handle input signal changes
        if (this.showInviteCode()) {
            this.invitationForm.patchValue({ inviteCode: this.inviteCode() });
        }

        if (this.showShops()) {
            this.invitationForm.get('shops')?.setValidators([Validators.required, Validators.minLength(1)]);
        }
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
        }, 1500);
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
