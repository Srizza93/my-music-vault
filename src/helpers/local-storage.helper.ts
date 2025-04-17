import { Injectable } from '@angular/core';

export const LOCAL_STORAGE_USER_ID = 'my-music-vault-user-id';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHelper {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
