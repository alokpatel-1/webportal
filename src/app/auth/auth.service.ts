import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router
    // private http: HttpClient, // Uncomment when using real API
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    // TODO: Replace with actual API endpoint
    // For now, this is a placeholder that simulates an API call
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        // Simulate successful login
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            name: 'Test User',
            email: email
          },
          token: 'mock-jwt-token'
        };
        
        this.setAuthData(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });

    // Uncomment when you have a real API:
    // return this.http.post<AuthResponse>('/api/auth/login', { email, password })
    //   .pipe(tap(response => this.setAuthData(response)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    // TODO: Replace with actual API endpoint
    // For now, this is a placeholder that simulates an API call
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        // Simulate successful registration
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            name: name,
            email: email
          },
          token: 'mock-jwt-token'
        };
        
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });

    // Uncomment when you have a real API:
    // return this.http.post<AuthResponse>('/api/auth/register', { name, email, password })
    //   .pipe(tap(response => this.setAuthData(response)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
}

