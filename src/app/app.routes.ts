import type { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/home/home.component').then(
                (m) => m.HomeComponent
            ),
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
]
