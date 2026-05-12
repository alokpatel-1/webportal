import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Since the backend uses cookies for authentication, we need to ensure
  // that withCredentials is set to true for all API requests.
  const modifiedReq = req.clone({
    withCredentials: true
  });

  const router = inject(Router);
  const authService = inject(AuthService);

  return next(modifiedReq).pipe(
    tap({
      next: (event) => {
        // if (event instanceof HttpResponse) {
        //   // If login is successful, handle the role-based redirection globally here
        //   if ((req.url.includes('/auth/login') || req.url.includes('/accept-invite')) && event.body) {
        //     const body = event.body as any;
        //     if (body.success) {
        //       const roles = body.data?.user?.role || [];
        //       const redirectUrl = authService.getRedirectUrlByRole(roles);
        //       // Delay redirect slightly to match UI success animations
        //       setTimeout(() => {
        //         router.navigate([redirectUrl]);
        //       }, 1500);
        //     }
        //   }
        // }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};
