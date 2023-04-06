/* ------------------------------ Format Users ------------------------------ */
const formatUser = (userObj) => {
  const { ...user } = userObj.dataValues;

  const formattedUser = {
    ...user
  };

  if ("isFollowedByUser" in formattedUser) {
    formattedUser.isFollowedByUser = formattedUser.isFollowedByUser === 1;
  }

  return formattedUser;
};

const getFormattedUsers = (userObjs) => userObjs.map((userObj) => formatUser(userObj));

/* ------------------------------ Format Followers/Following ------------------------------ */

const getFormattedMutuals = (users) => {
  return users.map((user) => {
    user.isFollowedByUser = user.isFollowedByUser === 1;
    return user;
  });
};

/* ------------------------------ Format Tweets ------------------------------ */

const formatTweet = (tweetObj) => {
  const { User: user, LikedBy, retweets, ...tweet } = tweetObj.dataValues; // eslint-disable-line no-unused-vars
  const retweeter = tweetObj.retweeter;

  const formattedTweet = {
    ...tweet,
    name: user.name,
    handle: user.handle
  };

  if ("isLikedByUser" in formattedTweet) {
    formattedTweet.isLikedByUser = formattedTweet.isLikedByUser === 1;
  }

  if ("isRetweetedByUser" in formattedTweet) {
    formattedTweet.isRetweetedByUser = formattedTweet.isRetweetedByUser === 1;
  }

  if (retweeter) {
    formattedTweet.retweeter = retweeter;
  }
  return formattedTweet;
};

const getFormattedTweets = (tweetObjs) => tweetObjs.map((tweetObj) => formatTweet(tweetObj));

module.exports = {
  formatUser,
  getFormattedUsers,
  getFormattedMutuals,
  formatTweet,
  getFormattedTweets
};
