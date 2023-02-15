const { DataTypes } = require("sequelize");
const sequelize = require("./../sequelize");

const retweetModel = sequelize.define(
  "Retweet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tweet",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  { tableName: "retweets" }
);

module.exports = retweetModel;
