module.exports.config = {
  // Server config:
  server: {
    env: process.env.NODE_ENV || "development",
    port: process.env.SERVER_PORT || 5000,
  },
  // Database config:
  database: {
    uri: process.env.DB_URI,
  }
};
