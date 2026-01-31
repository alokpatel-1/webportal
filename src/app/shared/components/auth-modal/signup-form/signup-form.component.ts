import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
    @Output() submitSignup = new EventEmitter<{ name: string; email: string; password: string }>();
    @Output() switchToLogin = new EventEmitter<void>();

    signupForm: FormGroup;
    showPassword = false;
    showConfirmPassword = false;

    constructor(private fb: FormBuilder) {
        this.signupForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    // Custom validator to check if passwords match
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword) {
            return null;
        }

        return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    onSubmit() {
        if (this.signupForm.valid) {
            // Emit only name, email, and password (exclude confirmPassword)
            const { name, email, password } = this.signupForm.value;
            this.submitSignup.emit({ name, email, password });
        } else {
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.signupForm.controls).forEach(key => {
            const control = this.signupForm.get(key);
            control?.markAsTouched();
        });
    }
}
