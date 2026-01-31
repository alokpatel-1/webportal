import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RegisterPayload, LoginPayload, AuthUser, AuthResponse } from '../models/auth.model';

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
    }

    resendVerification(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/resend-verification`, { email }, { withCredentials: true });
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
        // Cookies are usually cleared by the backend or manually if needed
    }

    private storeUser(user: AuthUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    private getStoredUser(): AuthUser | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}
