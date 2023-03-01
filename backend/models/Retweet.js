const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");
const User = require("./User");
const Tweet = require("./Tweet");

const retweetModel = sequelize.define(
  "Retweet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tweet,
        key: "id"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    }
  },
  {
    tableName: "retweets"
  }
);

module.exports = retweetModel;
