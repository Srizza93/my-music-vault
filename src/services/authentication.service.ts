import { Injectable } from '@angular/core';
import { JWT_COOKIE_NAME, CookieHelper } from '@/helpers/cookie.helper';
import {
  LOCAL_STORAGE_USER_ID,
  LocalStorageHelper,
} from '@/helpers/local-storage.helper';
import { Router } from '@angular/router';
import {
  authenticationPage,
  myMusicVaultPage,
} from '@/constants/pagesConstants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private cookieHelper: CookieHelper,
    private router: Router,
    private localStorageHelper: LocalStorageHelper
  ) {
    this.localStorageHelper = localStorageHelper;
    this.cookieHelper = cookieHelper;
    this.router = router;
  }

  isAuthenticated(): boolean {
    return (
      !!this.cookieHelper.getCookie(JWT_COOKIE_NAME) &&
      !!this.localStorageHelper.getItem(LOCAL_STORAGE_USER_ID) &&
      this.cookieHelper.getCookie(JWT_COOKIE_NAME) !== 'undefined' &&
      this.localStorageHelper.getItem(LOCAL_STORAGE_USER_ID) !== 'undefined'
    );
  }

  login(jwtValue: string, expiresInSeconds: number, userId: string): void {
    this.cookieHelper.setCookie(JWT_COOKIE_NAME, jwtValue, expiresInSeconds);
    this.localStorageHelper.setItem(LOCAL_STORAGE_USER_ID, userId);
    this.router.navigate([myMusicVaultPage]);
  }

  logout(): void {
    this.cookieHelper.deleteCookie(JWT_COOKIE_NAME);
    this.localStorageHelper.removeItem(LOCAL_STORAGE_USER_ID);
    this.router.navigate([authenticationPage]);
  }
}
