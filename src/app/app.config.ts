import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { forloadingInterceptor } from './forloading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSignalFormsConfig({classes:NG_STATUS_CLASSES}),
    provideHttpClient(withInterceptors([forloadingInterceptor]))
  ]
};
