import { Routes } from '@angular/router';
import { AuthenticationComponent } from '../pages/authentication/authentication.component';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'user',
    loadComponent: () =>
      import('../pages/user/user.component').then((m) => m.UserComponent),
  },
];
