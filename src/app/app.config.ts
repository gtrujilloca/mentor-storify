import { Cart } from '@/core/models/cart.interface';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { storeApiInterceptor } from './core/interceptors/store-api.interceptor';
import { AuthGateway } from './domain/gateways/auth-gateway';
import { AuthUsecase } from './domain/usecases/auth-usecase';
import { AuthService } from './infrastructure/driven-adapters/auth.service';
import { CartGateway } from './domain/gateways/cart-gateway';
import { CartUsecase } from './domain/usecases/cart-usecase';
import { CartService } from './infrastructure/driven-adapters/cart.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([storeApiInterceptor]), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    AuthUsecase,
    {
      provide: AuthGateway,
      useClass: AuthService
    },
    CartUsecase,
    CartService,
    {
      provide: CartGateway,
      useClass: CartService
    }
  ]
};
