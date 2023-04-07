const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");

sequelize.define(
  "Session",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    expires: DataTypes.DATE
  },
  {
    tableName: "sessions"
  }
);
