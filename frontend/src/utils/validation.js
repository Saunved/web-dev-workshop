// RFC 5322 Official Standard
// Taken from - http://emailregex.com/

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MIN_PASSWORD_LENGTH = 6;

export const isEmailValid = (email) => {
  return EMAIL_REGEX.test(email);
};

export const isPasswordValid = (password) => {
  return password.trim().length >= MIN_PASSWORD_LENGTH;
};
