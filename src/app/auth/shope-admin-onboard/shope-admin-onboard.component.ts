import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/auth.model';

enum OnboardingStep {
    EmailRequest = 'email-request',
    Pending = 'pending',
    PasswordSetup = 'password-setup',
    Success = 'success'
}

@Component({
    selector: 'app-shope-admin-onboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './shope-admin-onboard.component.html',
    styleUrl: './shope-admin-onboard.component.scss'
})
export class ShopeAdminOnboardComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    protected router = inject(Router);
    private authService = inject(AuthService);

    protected OnboardingStep = OnboardingStep;
    protected UserRole = UserRole;
    currentStep = signal<OnboardingStep>(OnboardingStep.EmailRequest);
    userRole = signal<UserRole>(UserRole.ADMIN);

    emailForm: FormGroup;
    passwordForm: FormGroup;
    isLoading = signal(false);
    errorMessage = signal<string | null>(null);
    showPassword = signal(false);
    showConfirmPassword = signal(false);

    token: string | null = null;
    prepopulatedEmail: string | null = null;

    get roleLabel(): string {
        return this.userRole() === UserRole.SELLER ? 'Seller' : 'Shop Admin';
    }

    get roleSubtitle(): string {
        return this.userRole() === UserRole.SELLER
            ? 'Start selling your products on Livo.'
            : "Empower your shop with Livo's management tools.";
    }

    constructor() {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.passwordForm = this.fb.group({
            email: [{ value: '', disabled: true }],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: [this.passwordMatchValidator] });
    }

    ngOnInit() {
        // Detect role from route data
        const role = this.route.snapshot.data['role'];
        if (role) {
            this.userRole.set(role);
        }

        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
            this.prepopulatedEmail = params['email'];

            if (this.token && this.prepopulatedEmail) {
                this.currentStep.set(OnboardingStep.PasswordSetup);
                this.passwordForm.patchValue({ email: this.prepopulatedEmail });

                this.checkTokenValidity(this.token);
            }
        });
    }

    private checkTokenValidity(token: string) {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.authService.checkTokenValidity(token).subscribe({
            next: (res) => {
                this.isLoading.set(false);
                this.currentStep.set(OnboardingStep.PasswordSetup);
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set(err.error?.message || 'Failed to check token validity.');
                // Optionally redirect to email request step if token is invalid
                // this.currentStep.set(OnboardingStep.EmailRequest);
            }
        });
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        return control.get('password')?.value === control.get('confirmPassword')?.value
            ? null : { 'mismatch': true };
    }

    onRequestEmail() {
        if (this.emailForm.invalid) {
            this.emailForm.markAllAsTouched();
            return;
        };

        this.currentStep.set(OnboardingStep.Pending);
        // this.isLoading.set(true);
        // this.errorMessage.set(null);

        // this.authService.requestOnboardingEmail(this.emailForm.value.email).subscribe({
        //     next: () => {
        //         this.isLoading.set(false);
        //         this.currentStep.set(OnboardingStep.Pending);
        //     },
        //     error: (err) => {
        //         this.isLoading.set(false);
        //         this.errorMessage.set(err.error?.message || 'Failed to send onboarding email.');
        //     }
        // });
    }

    onCompleteOnboarding() {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        };

        this.currentStep.set(OnboardingStep.Success);
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 3000);

        // this.isLoading.set(true);
        // this.errorMessage.set(null);

        // const payload = {
        //     token: this.token,
        //     email: this.prepopulatedEmail,
        //     password: this.passwordForm.get('password')?.value
        // };

        // this.authService.completeOnboarding(payload).subscribe({
        //     next: () => {
        //         this.isLoading.set(false);
        //         this.currentStep.set(OnboardingStep.Success);
        //         setTimeout(() => {
        //             this.router.navigate(['/']);
        //         }, 3000);
        //     },
        //     error: (err) => {
        //         this.isLoading.set(false);
        //         this.errorMessage.set(err.error?.message || 'Failed to complete registration.');
        //     }
        // });
    }
}

