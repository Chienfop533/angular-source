import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const configToast = {
  timeOut: 3000,
  tapToDismiss: true,
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
};
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
