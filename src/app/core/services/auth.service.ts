import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RegisterPayload, LoginPayload, AuthUser, AuthResponse, UserRole } from '../models/auth.model';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    currentUser = signal<AuthUser | null>(this.getStoredUser());

    register(payload: RegisterPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, payload, { withCredentials: true });
    }

    login(payload: LoginPayload): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, payload, { withCredentials: true }).pipe(
            tap(res => {
                if (res.success && res.data?.user) {
                    this.storeUser(res.data.user);
                    this.currentUser.set(res.data.user);
                }
            })
        );
    };

    resendVerification(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/resend-verification`, { email }, { withCredentials: true });
    }

    requestOnboardingEmail(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/onboarding/request`, { email }, { withCredentials: true });
    }

    completeOnboarding(payload: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/onboarding/complete`, payload, { withCredentials: true });
    }

    checkTokenValidity(token: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/auth/onboarding/check-token`, {
            params: { token },
            withCredentials: true
        });
    }

    validateInviteToken(token: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/invite/validate`, {
            params: { token },
            withCredentials: true
        });
    }

    acceptInvite(payload: { token: string; password: string; name: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/invite/accept`, payload, { withCredentials: true });
    }

    verifyEmail(token: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/auth/verify-email`, {
            params: { token },
            withCredentials: true
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
        // Cookies are usually cleared by the backend or manually if needed
    }

    getRedirectUrlByRole(roles: string[]): string {
        if (roles.includes(UserRole.SUPER_ADMIN)) {
            return '/super-admin';
        } else if (roles.includes(UserRole.ADMIN)) {
            return '/admin';
        } else if (roles.includes(UserRole.SELLER)) {
            return '/seller';
        } else if (roles.includes(UserRole.USER)) {
            return '/';
        }
        return '/';
    }

    private storeUser(user: AuthUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    private getStoredUser(): AuthUser | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
