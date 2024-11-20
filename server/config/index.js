module.exports = {
  environment: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 4000,
  sessionAuth: {
    accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    cookieKey: process.env.JWT_COOKIE_KEY
  }
};
