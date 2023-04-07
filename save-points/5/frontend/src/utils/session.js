const getUser = () => {
  return {
    id: localStorage.getItem("userId"),
    handle: localStorage.getItem("userHandle"),
  };
};

const isLoggedIn = () => {
  return getUser().id;
};

const setUser = (user) => {
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userHandle", user.handle);
  localStorage.setItem("feed", "global");
};

const clearUser = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userHandle");
  localStorage.removeItem("feed");
};

export default {
  getUser,
  isLoggedIn,
  setUser,
  clearUser,
};
