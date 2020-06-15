const generateUUID = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const generatePassword = () =>
  Math.random().toString(36).substring(2) +
  Math.random().toString(36).substring(2);

const checkEmail = (emailToCheck, users) => {
  const emailArray = users.filter((user) => user.email === emailToCheck);
  return emailArray && emailArray.length > 0 ? true : false;
};

const checkUsername = (usernameToCheck, users) => {
  const usernameArray = users.filter(
    (user) => user.username === usernameToCheck,
  );
  return usernameArray && usernameArray.length > 0 ? true : false;
};

module.exports = {
  generatePassword,
  generateUUID,
  checkEmail,
  checkUsername,
};
