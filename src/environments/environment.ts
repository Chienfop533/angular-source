export const environment = {
  production: false,
  apiConfig: {
    baseUrl: 'https://gateway-dev.becamex.com.vn/speech-processing',
  },
  oAuthConfig: {
    issuer: 'https://authserver-dev.becamex.com.vn',
    redirectUri: 'https://localhost:4200',
    postLogoutRedirectUri: 'https://localhost:4200',
    clientId: 'SpeechProcessing_FE',
    responseType: 'code',
    scope: 'offline_access openid email profile SpeechProcessingService',
    requireHttps: true,
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge',
  },
};
