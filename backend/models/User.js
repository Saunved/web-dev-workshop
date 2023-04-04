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
    website: {
      type: DataTypes.TEXT,
      allowNull: true
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
      allowNull: true
    }
  },
  {
    tableName: "users"
  }
);

userModel.belongsToMany(userModel, {
  through: "follows",
  as: "Follower",
  foreignKey: "followingId",
  otherKey: "followerId"
});

userModel.belongsToMany(userModel, {
  through: "follows",
  as: "Following",
  foreignKey: "followerId",
  otherKey: "followingId"
});

module.exports = userModel;
