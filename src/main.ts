import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AuthService } from './app/services/auth.service';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

async function bootstrap() {
  const appRef = await bootstrapApplication(AppComponent, appConfig);
  const auth = appRef.injector.get(AuthService);
  await auth.init();
}

bootstrap();
