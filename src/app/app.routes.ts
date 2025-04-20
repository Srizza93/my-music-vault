import { Routes } from '@angular/router';
import { AuthenticationComponent } from '@/pages/authentication/authentication.component';
import { authGuard } from '@/app/guards/authentication.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'my-music-vault',
    loadComponent: () =>
      import('@/pages/my-music-vault/my-music-vault.component').then(
        (m) => m.MyMusicVaultComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', component: AuthenticationComponent },
];
