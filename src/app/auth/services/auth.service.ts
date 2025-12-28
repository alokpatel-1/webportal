import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  constructor(private router: Router) {
    // Check for stored user data on service initialization
    this.loadUserFromStorage();
  }

  /**
   * Login user with credentials
   */
  login(email: string, password: string, rememberMe: boolean = false): boolean {
    // TODO: Replace with actual API call
    // For now, simulate login with mock data
    const mockUser: User = {
      id: '1',
      name: 'Alok',
      email: email,
      phone: '7905845567'
    };

    this._user.set(mockUser);
    
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    
    return true;
  }

  /**
   * Signup new user
   */
  signup(fullName: string, email: string, password: string): boolean {
    // TODO: Replace with actual API call
    // For now, simulate signup with mock data
    const newUser: User = {
      id: '1',
      name: fullName,
      email: email,
      phone: ''
    };

    this._user.set(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  }

  /**
   * Logout user
   */
  logout(): void {
    this._user.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
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
}

