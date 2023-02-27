const MIN_PASSWORD_LENGTH = 6;

const verifyLoginInfo = (email, password) => {
  const validRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  return password.length < MIN_PASSWORD_LENGTH || !email.match(validRegex);
};

export default verifyLoginInfo;
