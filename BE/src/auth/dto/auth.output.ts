interface AuthOutput {
  accessToken: string | null;
  refreshToken: string | null;
  expired_accessToken: number | null;
  expired_refreshToken: number | null;
}
