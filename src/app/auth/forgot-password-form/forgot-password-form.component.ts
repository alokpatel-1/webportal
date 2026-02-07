import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-forgot-password-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    templateUrl: './forgot-password-form.component.html',
    styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {
    @Output() submitForgotPassword = new EventEmitter<{ email: string }>();
    @Output() switchToLogin = new EventEmitter<void>();

    forgotPasswordForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.forgotPasswordForm.valid) {
            this.submitForgotPassword.emit(this.forgotPasswordForm.value);
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.forgotPasswordForm.controls).forEach(key => {
            const control = this.forgotPasswordForm.get(key);
            control?.markAsTouched();
        });
    }
}
