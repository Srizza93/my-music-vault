import { Routes } from '@angular/router';
import { AuthenticationComponent } from '@/pages/authentication/authentication.component';
import { authGuard } from '@/app/guards/authentication.guard';
import { authenticationPage } from '@/constants/pagesConstants';
import {
  authenticationPath,
  myMusicVaultPath,
  signupPath,
} from '@/constants/paths.constants';

export const routes: Routes = [
  { path: '', redirectTo: authenticationPage, pathMatch: 'full' },
  { path: authenticationPath, component: AuthenticationComponent },
  {
    path: myMusicVaultPath,
    loadComponent: () =>
      import('@/pages/my-music-vault/my-music-vault.component').then(
        (m) => m.MyMusicVaultComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: signupPath,
    loadComponent: () =>
      import('@/pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  { path: '**', component: AuthenticationComponent },
];
