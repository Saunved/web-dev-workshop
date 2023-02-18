const { DataTypes } = require("sequelize");
const sequelize = require("./../sequelize");

const likeModel = sequelize.define(
  "Like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    tweetId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: "likes",
  }
);

module.exports = likeModel;
