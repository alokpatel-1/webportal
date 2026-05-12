import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Livo — everything you live for';

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // this.verifyAuthToken();
  }

  verifyAuthToken() {
    this.route.queryParams.subscribe(params => {
      // If we are on accept-invite, don't run this global verification yet, let the component handle it
      // Alternatively, we can just run it. But let's check the global verification.
      if (this.router.url.includes('/accept-invite')) {
        return;
      }

      const token = params['token'] || null;

      this.authService.verifyAuthToken(token).subscribe({
        next: (res) => {
          if (res.success && res.data?.user) {
            // Optional: Auto redirect based on role if they are hitting the root URL
            if (this.router.url === '/' || this.router.url === '/?token=' + token) {
              const redirectUrl = this.authService.getRedirectUrlByRole(res.data.user.role || []);
              this.router.navigate([redirectUrl]);
            }
          }
        },
        error: (err) => {
          // Token is invalid/expired
          // Redirection and logout are automatically handled by the global error interceptor
          console.error('Session verification failed:', err.message || err);
        }
      });
    });
  }
}
