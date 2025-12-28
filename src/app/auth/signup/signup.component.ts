import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecorativeElementsComponent } from '../decorative-elements/decorative-elements.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DecorativeElementsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  showPassword = false;
  agreeToTerms = false;
  
  fullName = '';
  email = '';
  password = '';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignup() {
    // Handle signup logic here
    console.log('Signup attempt', { 
      fullName: this.fullName, 
      email: this.email, 
      password: this.password 
    });
  }

  onGoogleSignup() {
    // Handle Google signup logic here
    console.log('Google signup');
  }
}

