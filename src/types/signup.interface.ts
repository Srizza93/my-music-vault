export interface Signup {
  app_metadata: { provider: string; providers: string[] };
  aud: string;
  confirmation_sent_at: string;
  created_at: string;
  email: string;
  id: string;
  identities: string[];
  is_anonymous: false;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: {};
}
