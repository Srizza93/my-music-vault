import { environment } from '@/environments/environment';

export const API_VERSION = '/rest/v1';
export const SONGS_ENDPOINT = '/songs';
export const GENRES_ENDPOINT = '/genres';
export const MOODS_ENDPOINT = '/moods';
export const AUTH_ENDPOINT = '/auth/v1';
export const LOGIN_ENDPOINT = '/token?grant_type=password';
export const SIGNUP_ENDPOINT = '/signup';
export const API_URL = environment.supabaseUrl + API_VERSION;
export const LOGIN_FULL_ENDPOINT =
  environment.supabaseUrl + AUTH_ENDPOINT + LOGIN_ENDPOINT;
export const SIGNUP_FULL_ENDPOINT =
  environment.supabaseUrl + AUTH_ENDPOINT + SIGNUP_ENDPOINT;
