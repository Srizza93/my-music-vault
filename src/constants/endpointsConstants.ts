import { environment } from '@/environments/environment';

export const API_VERSION = '/rest/v1';
export const SONGS_ENDPOINT = '/songs';
export const GENRES_ENDPOINT = '/genres';
export const MOODS_ENDPOINT = '/moods';
export const AUTH_ENDPOINT = '/auth/v1/token?grant_type=password';
export const API_URL = environment.supabaseUrl + API_VERSION;
export const AUTH_URL = environment.supabaseUrl + AUTH_ENDPOINT;
