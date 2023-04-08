export const attachAuthCookie = (req) => {
  return {
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  };
};
