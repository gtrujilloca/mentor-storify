import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { authRoutes } from './ui/pages/auth/auth.routing';
import { authGuard } from './core/guards/auth.guard';
import { matchtestGuard } from './core/guards/matchtest.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@/ui/pages/dashboard/dashboard.component'),
        canActivate: [
            authGuard
        ],
    },
    {
        path: 'checkout',
        loadComponent: () => import('@/ui/pages/checkout/checkout.component')
    },
    {
        path: 'auth',
        loadComponent: () => import('@/ui/pages/auth/auth.component'),
        children: authRoutes
    },
    {
        path: 'product/:name',
        loadComponent: () => import('@/ui/pages/product-detail/product-detail.component')
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
