const setFeed = (feed) => {
  localStorage.setItem("feed", feed);
};

const getFeed = () => {
  return localStorage.getItem("feed") || "global";
};

export default {
  getFeed,
  setFeed,
};
