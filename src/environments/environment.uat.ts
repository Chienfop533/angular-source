export const environment = {
  production: false,
  apiConfig: {
    baseUrl: 'https://gateway-uat.becamex.com.vn/speech-processing',
  },
  oAuthConfig: {
    issuer: 'https://authserver-uat.becamex.com.vn',
    redirectUri: 'https://audio-processing-uat.becamex.com.vn',
    postLogoutRedirectUri: 'https://audio-processing-uat.becamex.com.vn',
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
