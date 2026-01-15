import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.oAuthConfig.issuer,
  clientId: environment.oAuthConfig.clientId,
  redirectUri: environment.oAuthConfig.redirectUri,
  postLogoutRedirectUri: environment.oAuthConfig.postLogoutRedirectUri,
  responseType: environment.oAuthConfig.responseType,
  scope: environment.oAuthConfig.scope,
  requireHttps: environment.oAuthConfig.requireHttps,
  showDebugInformation: false,
};

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
