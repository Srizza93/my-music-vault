export interface Login {
  access_token: string;
  expires_in: number;
  user: {
    id: string;
  };
}
