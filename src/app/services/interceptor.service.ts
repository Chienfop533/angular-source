import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${this.oauthService.getAccessToken()}`
      ),
    });

    return next.handle(modifiedReq);
  }
}
