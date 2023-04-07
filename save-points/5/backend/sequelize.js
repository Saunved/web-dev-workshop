const { Sequelize } = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { config } = require("./configs/config");

// Connect to database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./woofer.sqlite"
});

(async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (err) {
    console.error(err);
  }
})();

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  extendDefaultFields: config.session.extendDefaultFields
});

(async () => {
  try {
    await sessionStore.sync({ force: false });
  } catch (err) {
    console.error(err);
  }
})();

module.exports = { sequelize, sessionStore };
