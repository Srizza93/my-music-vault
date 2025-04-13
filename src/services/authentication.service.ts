import { Injectable } from '@angular/core';
import { JWT_COOKIE_NAME, CookieHelper } from '@/helpers/cookie.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private cookieHelper: CookieHelper;

  constructor(cookieHelper: CookieHelper) {
    this.cookieHelper = cookieHelper;
  }

  isAuthenticated(): boolean {
    return !!this.cookieHelper.getCookie(JWT_COOKIE_NAME);
  }

  login(jwtValue: string): void {
    this.cookieHelper.setCookie(JWT_COOKIE_NAME, jwtValue, 1);
  }

  logout(): void {
    this.cookieHelper.deleteCookie(JWT_COOKIE_NAME);
  }
}
