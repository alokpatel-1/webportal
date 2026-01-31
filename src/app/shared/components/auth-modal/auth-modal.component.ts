import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { AuthService, RegisterPayload } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';

export enum AuthMode {
    Login = 'login',
    Signup = 'signup',
    ForgotPassword = 'forgot-password'
}

@Component({
    selector: 'app-auth-modal',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, SignupFormComponent, ForgotPasswordFormComponent],
    templateUrl: './auth-modal.component.html',
    styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    private authService = inject(AuthService);

    // Expose enum to template
    readonly AuthMode = AuthMode;

    // Signals for state
    mode = signal<AuthMode>(AuthMode.Login);
    isLoading = signal<boolean>(false);
    successMessage = signal<string | null>(null);
    errorMessage = signal<string | null>(null);

    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.resetState();
    }

    resetState() {
        this.mode.set(AuthMode.Login);
        this.successMessage.set(null);
        this.errorMessage.set(null);
        this.isLoading.set(false);
    }

    switchMode(newMode: AuthMode) {
        this.mode.set(newMode);
        this.successMessage.set(null);
        this.errorMessage.set(null);
    }

    // Handle login submission
    onLoginSubmit(credentials: { email: string; password: string }) {
        console.log('Logging in...', credentials);
    }

    // Handle signup submission
    onSignupSubmit(data: RegisterPayload) {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.successMessage.set(null);

        this.authService.register(data)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (res) => {
                    this.successMessage.set(res.message);
                    console.log('Signup successful:', res);
                    // Optionally switch to login or show success screen
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Registration failed. Please try again.');
                    console.error('Signup error:', err);
                }
            });
    }

    // Handle forgot password submission
    onForgotPasswordSubmit(data: { email: string }) {
        console.log('Resetting password...', data);
    }
}
