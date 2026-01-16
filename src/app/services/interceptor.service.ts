import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { catchError, retry, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { from, Observable } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  public router = inject(Router);

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.oauthService.getAccessToken()}`
      ),
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          // 403
          if (error.status === 403) {
            this.toastService.showError(
              'Không có quyền thực hiện chức năng này!'
            );
          }

          // 401 — refresh token + retry
          if (error.status === 401) {
            return from(this.authService.onRefreshToken()).pipe(
              switchMap((newToken: any) => {
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken.access_token}`,
                  },
                });
                return next.handle(newReq).pipe(retry(1));
              })
            );
          }

          // Network error
          if (error.status === 0 && error.ok === false) {
            this.router.navigate(['error']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
