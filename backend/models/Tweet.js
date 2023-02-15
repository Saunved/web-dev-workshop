const { DataTypes } = require("sequelize");
const sequelize = require("./../sequelize");

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "user",
        key: "id",
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    retweetCount: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    hashtagId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: "tweets",
  }
);

module.exports = tweetModel;
