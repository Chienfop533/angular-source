export const environment = {
  production: true,
  apiConfig: {
    baseUrl: 'https://gateway.becamex.com.vn/speech-processing',
  },
  oAuthConfig: {
    issuer: 'https://authserver.becamex.com.vn',
    redirectUri: 'https://audio-processing.becamex.com.vn',
    postLogoutRedirectUri: 'https://audio-processing.becamex.com.vn',
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
