import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

enum InviteStep {
    Validating = 'validating',
    PasswordSetup = 'password-setup',
    Success = 'success',
    Error = 'error'
}

@Component({
    selector: 'app-accept-invite',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './accept-invite.component.html',
    styleUrl: './accept-invite.component.scss'
})
export class AcceptInviteComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    protected router = inject(Router);
    private authService = inject(AuthService);

    protected InviteStep = InviteStep;
    currentStep = signal<InviteStep>(InviteStep.Validating);

    passwordForm: FormGroup;
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    showPassword = signal(false);
    showConfirmPassword = signal(false);

    token: string | null = null;
    email: string | null = null;
    roleName = signal<string | null>(null);

    get isExpired(): boolean {
        const msg = this.errorMessage()?.toLowerCase() || '';
        return msg.includes('expire');
    }

    constructor() {
        this.passwordForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: [{ value: '', disabled: true }],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: [this.passwordMatchValidator] });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];

            if (this.token) {
                this.validateToken(this.token);
            } else {
                this.currentStep.set(InviteStep.Error);
                this.errorMessage.set('Invalid invitation link. Please check the link and try again.');
            }
        });
    }

    private validateToken(token: string) {
        this.authService.validateInviteToken(token).subscribe({
            next: (res) => {
                if (!res?.valid) {
                    this.currentStep.set(InviteStep.Error);
                    this.errorMessage.set(res?.message || 'This invitation link is no longer valid.');
                    return;
                }
                this.email = res?.email || null;
                if (this.email) {
                    this.passwordForm.patchValue({ email: this.email });
                }
                
                // Capture the role name to display it on the UI
                if (res?.roleName) {
                    // Format from UPPER_CASE to Title Case if needed, or use as is
                    const formattedRole = res.roleName.replace(/_/g, ' ').replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                    this.roleName.set(formattedRole);
                } else if (res?.type === 'self') {
                    this.roleName.set('Shop Admin');
                } else if (res?.type === 'shop_invite') {
                    this.roleName.set('Seller');
                }

                this.currentStep.set(InviteStep.PasswordSetup);
            },
            error: (err) => {
                this.currentStep.set(InviteStep.Error);
                this.errorMessage.set(err.error?.message || 'This invitation link has expired or is invalid.');
            }
        });
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        return control.get('password')?.value === control.get('confirmPassword')?.value
            ? null : { 'mismatch': true };
    }

    onAcceptInvite() {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set(null);

        const payload = {
            token: this.token!,
            name: this.passwordForm.get('name')?.value,
            password: this.passwordForm.get('password')?.value
        };

        this.authService.acceptInvite(payload).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.currentStep.set(InviteStep.Success);
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 3000);
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set(err.error?.message || 'Failed to accept invitation. Please try again.');
            }
        });
    }
}
