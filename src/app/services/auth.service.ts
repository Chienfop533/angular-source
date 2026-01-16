import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../common/config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauth: OAuthService) {
    this.oauth.configure(authConfig);
    this.oauth.setStorage(localStorage);
  }

  async init(): Promise<void> {
    await this.oauth.loadDiscoveryDocumentAndTryLogin();
    this.oauth.setupAutomaticSilentRefresh();
    if (!this.oauth.hasValidAccessToken()) {
      this.login();
    }
  }
  login() {
    this.oauth.initCodeFlow();
  }

  logout() {
    this.oauth.logOut();
  }
  public onRefreshToken() {
    return this.oauth.refreshToken();
  }
  get isLoggedIn(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  get accessToken(): string {
    return this.oauth.getAccessToken();
  }

  get identityClaims(): object {
    return this.oauth.getIdentityClaims() as object;
  }
}
