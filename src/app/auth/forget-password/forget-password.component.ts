import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecorativeElementsComponent } from '../decorative-elements/decorative-elements.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DecorativeElementsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  emailSent = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      // Handle forgot password logic here
      console.log('Forgot password request', this.forgetPasswordForm.value);
      this.emailSent = true;
    } else {
      Object.keys(this.forgetPasswordForm.controls).forEach(key => {
        this.forgetPasswordForm.get(key)?.markAsTouched();
      });
    }
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
}

