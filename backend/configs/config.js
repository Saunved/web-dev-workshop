module.exports.config = {
  // Server config:
  server: {
    env: process.env.NODE_ENV || "development",
    port: process.env.SERVER_PORT || 5000,
  },
  // Database config:
  database: {
    uri: process.env.DB_URI,
  },
  // Session config:
  session: {
    secret: process.env.SESSION_SECRET_KEY,
    timeout: 1000 * 60 * 60 * 24,
    extendDefaultFields: (defaults, session) => {
      return {
        expires: defaults.expires,
        userId: session.userId,
      };
    },
  },
};
