import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';

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

    // Expose enum to template
    readonly AuthMode = AuthMode;

    // Signal for current auth mode
    mode = signal<AuthMode>(AuthMode.Login);

    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.mode.set(AuthMode.Login); // Reset to login on close
    }

    switchMode(newMode: AuthMode) {
        this.mode.set(newMode);
    }

    // Handle login submission
    onLoginSubmit(credentials: { email: string; password: string }) {
        console.log('Logging in...', credentials);
        // Implement actual login logic here
        // this.authService.login(credentials).subscribe(...)
    }

    // Handle signup submission
    onSignupSubmit(data: { name: string; email: string; password: string }) {
        console.log('Signing up...', data);
        // Implement actual signup logic here
        // this.authService.signup(data).subscribe(...)
    }

    // Handle forgot password submission
    onForgotPasswordSubmit(data: { email: string }) {
        console.log('Resetting password...', data);
        // Implement actual password reset logic here
        // this.authService.resetPassword(data).subscribe(...)
    }
}
