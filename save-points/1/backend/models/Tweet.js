const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");
const User = require("./User");

const tweetModel = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: User,
        key: "id"
      }
    },
    body: {
      type: DataTypes.STRING(280),
      allowNull: false
    }
  },
  {
    tableName: "tweets"
  }
);

tweetModel.belongsTo(User, {
  foreignKey: "userId"
});

User.belongsToMany(tweetModel, {
  as: "Likes",
  through: "likes"
});

tweetModel.belongsToMany(User, {
  as: "LikedBy",
  through: "likes"
});

tweetModel.belongsToMany(User, {
  as: "RetweetedBy",
  through: "retweets"
});

User.belongsToMany(tweetModel, {
  as: "Retweets",
  through: "retweets"
});

module.exports = tweetModel;
