export const JwtConfiguration = () => ({
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET || 'accessToken-secret',
    expireIn: process.env.ACCESS_EXPIRE_IN || '2m',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'refreshToken-secret',
    expireIn: process.env.REFRESH_EXPIRE_IN || '7d',
  },
});
