import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { storeApiInterceptor } from './core/interceptors/store-api.interceptor';
import { AuthGateway } from './domain/gateways/auth-gateway';
import { CartGateway } from './domain/gateways/cart-gateway';
import { AuthUsecase } from './domain/usecases/auth-usecase';
import { CartUsecase } from './domain/usecases/cart-usecase';
import { AuthService } from './infrastructure/driven-adapters/auth.service';
import { CartService } from './infrastructure/driven-adapters/cart.service';
import { storifyFeature } from './ui/state/reducers/storify.reducer';
import { StorifyEffects } from './ui/state/effects/storify.effects';
import { ProductsUsecase } from './domain/usecases/products-usecase';
import { ProductsGateway } from './domain/gateways/products-gateway';
import { ProductsService } from './infrastructure/driven-adapters/products.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([storeApiInterceptor]), withFetch()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideStore(),
        provideState(storifyFeature),
        provideEffects(StorifyEffects),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
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
        },
        ProductsUsecase,
        {
            provide: ProductsGateway,
            useClass: ProductsService
        }
    ]
};
