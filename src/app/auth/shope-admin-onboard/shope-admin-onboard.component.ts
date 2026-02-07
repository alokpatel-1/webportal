import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-shope-admin-onboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './shope-admin-onboard.component.html',
    styleUrl: './shope-admin-onboard.component.scss'
})
export class ShopeAdminOnboardComponent {
    // Logic for shop admin onboarding initialization
}
