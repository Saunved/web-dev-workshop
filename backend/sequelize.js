const { Sequelize } = require("sequelize");

// Connect to database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./woofer.sqlite",
});

(async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;
