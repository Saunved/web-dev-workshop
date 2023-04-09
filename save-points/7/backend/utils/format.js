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

  // Task 4: Some fields can have different datatype saved in database
  // vs the datatype being returned to frontend. isLikedByUser is
  // returned as 0 or 1 to us but frontend expects a boolean.
  if ("isLikedByUser" in formattedTweet) {
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
