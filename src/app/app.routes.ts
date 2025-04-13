import { Routes } from '@angular/router';
import { AuthenticationComponent } from '@/pages/authentication/authentication.component';
import { authGuard } from '@/app/guards/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'user',
    loadComponent: () =>
      import('@/pages/user/user.component').then((m) => m.UserComponent),
    canActivate: [authGuard],
  },
  { path: '**', component: AuthenticationComponent },
];
