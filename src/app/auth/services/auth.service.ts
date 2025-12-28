import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string[];
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
  };
  // Legacy support for direct user property
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  // Signal for user data - null means not logged in
  private _user = signal<User | null>(null);

  // Public readonly signal
  readonly user = this._user.asReadonly();

  // Computed signal for login status
  readonly isLoggedIn = computed(() => this._user() !== null);

  // Computed signal for user name
  readonly userName = computed(() => this._user()?.name || '');

  // Computed signal for user phone
  readonly userPhone = computed(() => this._user()?.phone || '');

  constructor() {
    // Check for stored user data on service initialization
    this.loadUserFromStorage();
    // Verify session on initialization
    this.verifySession();
  }

  /**
   * Register new user
   */
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const registerData: RegisterRequest = { name, email, password };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerData, {
      withCredentials: true // Important for cookie-based authentication
    }).pipe(
      tap((response) => {
        // Handle both new API structure (data.user) and legacy (user)
        const user = response.data?.user || response.user;
        if (user) {
          this._user.set(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Login user with credentials
   */
  login(email: string, password: string, rememberMe: boolean = false): Observable<AuthResponse> {
    const loginData: LoginRequest = { email, password };

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData, {
      withCredentials: true // Important for cookie-based authentication
    }).pipe(
      tap((response) => {
        // Handle both new API structure (data.user) and legacy (user)
        // Tokens (refreshToken, accessToken) are automatically stored in cookies by the browser
        const user = response.data?.user || response.user;
        if (user) {
          this._user.set(user);

          if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Change password (requires authentication)
   */
  changePassword(currentPassword: string, newPassword: string): Observable<AuthResponse> {
    const changePasswordData: ChangePasswordRequest = { currentPassword, newPassword };

    return this.http.post<AuthResponse>(`${this.apiUrl}/change-password`, changePasswordData, {
      withCredentials: true // Important for cookie-based authentication
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Verify session by checking if user is still authenticated
   */
  private verifySession(): void {
    // Optionally, you can add an endpoint to verify the session
    // For now, we'll just load from localStorage
    // If you have a /api/auth/verify endpoint, use it here
  }

  /**
   * Logout user (requires authentication)
   */
  logout(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true // Important for cookie-based authentication
    }).pipe(
      tap(() => {
        // Clear local state regardless of API response
        this._user.set(null);
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        // Even if logout API fails, clear local state
        this._user.set(null);
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
        return this.handleError(error);
      })
    );
  }

  /**
   * Update user profile
   */
  updateUser(userData: Partial<User>): void {
    const currentUser = this._user();
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        ...userData
      };
      this._user.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }

  /**
   * Load user from localStorage
   */
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this._user.set(user);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  /**
   * Handle HTTP errors
   */
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('Auth Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}

