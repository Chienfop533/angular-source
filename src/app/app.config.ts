import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppModule } from './app.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpClientInterceptor } from './services/interceptor.service';
import { routes } from './app.routes';
import { configToast } from './common/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    provideAnimations(),
    provideToastr(configToast),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.init(),
      deps: [AuthService],
      multi: true,
    },
    AppModule,
  ],
};
