export const JwtConfiguration = () => ({
  accessToken: {
    secret: 'accessToken-secret',
    expireIn: '2m',
  },
  refreshToken: {
    secret: 'refreshToken-secret',
    expireIn: '7d',
  },
});
