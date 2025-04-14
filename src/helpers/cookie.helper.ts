import { Injectable } from '@angular/core';

export const JWT_COOKIE_NAME = 'my-music-vault-jwt';

@Injectable({
  providedIn: 'root',
})
export class CookieHelper {
  getCookie(cookieName: string): string | undefined {
    const cookie = document.cookie
      .split(';')
      .find((cookie) => cookie.trimStart().startsWith(cookieName + '='));
    if (!cookie) {
      return;
    }
    return cookie.substring(cookie.indexOf('=') + 1);
  }

  deleteCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  setCookie(cookieName: string, cookieValue: string, seconds: number): void {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${cookieName}=${encodeURIComponent(
      cookieValue
    )}; ${expires}; path=/`;
  }
}
