const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    followerCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    followingCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  },
  {
    tableName: "users"
  }
);

module.exports = userModel;
