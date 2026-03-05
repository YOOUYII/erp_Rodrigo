import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        loadComponent: () => import('./pages/landing/landing').then(m=>m.Landing)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then(m=>m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then(m=>m.Register)
    },
    {
        path: 'admin',
        component: AdminLayout,
        children:[
            {
                path: '',
                redirectTo: 'groups',
                pathMatch: 'full'
            },
            {
                path: 'groups',
                loadComponent: () => import('./pages/groups/groups').then(m=>m.Groups)
            },
            {
                path: 'users',
                loadComponent: () => import('./pages/users/users').then(m=>m.Users)
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile').then(m=>m.Profile)
            },
        ] 
    }
];
