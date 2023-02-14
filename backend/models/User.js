const { DataTypes } = require("sequelize");
const sequelize = require("./../sequelize");
const tweetModel = require("./Tweet");

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    followerCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
      validate: {
        isDate: true,
      },
    },
  },
  {
    tableName: "users",
  }
);

userModel.hasMany(tweetModel); // Set one to many relationship

module.exports = userModel;
