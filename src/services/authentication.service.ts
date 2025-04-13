import { Injectable } from '@angular/core';
import { JWT_COOKIE_NAME, CookieHelper } from '@/helpers/cookie.helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private cookieHelper: CookieHelper, private router: Router) {
    this.cookieHelper = cookieHelper;
    this.router = router;
  }

  isAuthenticated(): boolean {
    return !!this.cookieHelper.getCookie(JWT_COOKIE_NAME);
  }

  login(jwtValue: string): void {
    this.cookieHelper.setCookie(JWT_COOKIE_NAME, jwtValue, 1);
    this.router.navigate(['/my-music-vault']);
  }

  logout(): void {
    this.cookieHelper.deleteCookie(JWT_COOKIE_NAME);
    this.router.navigate(['/authentication']);
  }
}
