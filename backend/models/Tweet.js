const { DataTypes } = require("sequelize");
const { sequelize } = require("./../sequelize");
const User = require("./User");
const Hashtag = require("./Hashtag");

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
    },
    hashtag: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Hashtag,
        key: "tag"
      }
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
  as: "Liker",
  through: "user_tweets_likes"
});

tweetModel.belongsToMany(User, {
  as: "LikedBy",
  through: "user_tweets_likes"
});

module.exports = tweetModel;
