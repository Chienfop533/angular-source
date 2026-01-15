export const environment = {
  production: false,
  apiConfig: {
    baseUrl: 'https://gateway-dev.becamex.com.vn/speech-processing',
  },
  oAuthConfig: {
    issuer: 'https://authserver-dev.becamex.com.vn',
    redirectUri: 'https://audio-processing-dev.becamex.com.vn',
    postLogoutRedirectUri: 'https://audio-processing-dev.becamex.com.vn',
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
