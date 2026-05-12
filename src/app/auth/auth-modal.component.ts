import { Component, EventEmitter, Input, Output, signal, inject, DestroyRef, model } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { AuthService } from '../core/services/auth.service';
import { AuthMode, RegisterPayload, LoginPayload, AuthCode } from '../core/models/auth.model';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-auth-modal',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, SignupFormComponent, ForgotPasswordFormComponent],
    templateUrl: './auth-modal.component.html',
    styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
    visible = model<boolean>(false);

    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);

    // Expose enum to template
    readonly AuthMode = AuthMode;
    readonly AuthCode = AuthCode;

    // Signals for state
    mode = signal<AuthMode>(AuthMode.Login);
    isLoading = signal<boolean>(false);
    successMessage = signal<string | null>(null);
    errorMessage = signal<string | null>(null);
    errorCode = signal<AuthCode | null>(null);
    lastAttemptedEmail = signal<string | null>(null);

    close() {
        this.visible.set(false);
        this.resetState();
    }

    resetState() {
        this.mode.set(AuthMode.Login);
        this.successMessage.set(null);
        this.errorMessage.set(null);
        this.errorCode.set(null);
        this.isLoading.set(false);
        this.lastAttemptedEmail.set(null);
    }

    switchMode(newMode: AuthMode) {
        this.mode.set(newMode);
        this.successMessage.set(null);
        this.errorMessage.set(null);
        this.errorCode.set(null);
    }

    // Handle login submission
    onLoginSubmit(credentials: LoginPayload) {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.errorCode.set(null);
        this.successMessage.set(null);
        this.lastAttemptedEmail.set(credentials.email);

        this.authService.login(credentials)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe({
                next: (res) => {
                    this.successMessage.set(res.message);
                    console.log('Login successful:', res);

                    setTimeout(() => {
                        this.close();
                    }, 1500);
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Login failed. Please check your credentials.');
                    this.errorCode.set(err.error?.code);
                    console.error('Login error:', err);
                }
            });
    }

    // Handle signup submission
    onSignupSubmit(data: RegisterPayload) {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.successMessage.set(null);

        this.authService.register(data)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.isLoading.set(false))
            )
            .subscribe({
                next: (res) => {
                    this.successMessage.set(res.message);
                    this.mode.set(AuthMode.Login);
                    console.log('Signup successful:', res);
                    setTimeout(() => this.successMessage.set(null), 500000);
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

    resendEmail() {
        const email = this.lastAttemptedEmail();
        if (!email) return;

        this.isLoading.set(true);
        this.authService.resendVerification(email).pipe(
            finalize(() => this.isLoading.set(false))
        ).subscribe({
            next: (res) => {
                this.successMessage.set(res.message || 'Verification email resent successfully.');
                this.errorMessage.set(null);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Failed to resend verification email.');
            }
        });
    }
}
