import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors globally
      if (error.status === 401 || error.status === 403) {
        // Token might be expired or invalid, log out the user
        authService.logout();

        // Optionally pass the current URL as a returnUrl query param
        // const returnUrl = router.routerState.snapshot.url;
        router.navigate(['/']);
      }

      // We can also handle other global error codes here (e.g. 403 Forbidden, 500 Internal Server Error)

      return throwError(() => error);
    })
  );
};
