const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

const verifyAdminForm = (email, name, password) => {
  const validRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  return password.length < MIN_PASSWORD_LENGTH
  || !email.match(validRegex)
  || name.length < MIN_NAME_LENGTH;
};

export default verifyAdminForm;
