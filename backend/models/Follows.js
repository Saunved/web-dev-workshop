const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");
const User = require("./User");

const followsModel = sequelize.define(
  "Follows",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    followingUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "follows",
  }
);

module.exports = followsModel;
