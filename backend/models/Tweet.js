const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");

const tweetModel = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashtagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    retweetCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    tableName: "tweets",
  }
);

module.exports = tweetModel;
