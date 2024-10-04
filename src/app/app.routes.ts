import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@/ui/pages/dashboard/dashboard.component')
    },
    {
        path: 'checkout',
        loadComponent: () => import('@/ui/pages/checkout/checkout.component')
    },
    {
        path: 'auth',
        loadComponent: () => import('@/ui/pages/auth/auth.component')
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
