import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard to prevent logged-in users from accessing auth pages (login, signup)
 * If user is already logged in, redirect to dashboard
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // User is logged in, redirect to dashboard
    router.navigate(['/dashboard']);
    return false;
  }

  // User is not logged in, allow access to auth pages
  return true;
};

