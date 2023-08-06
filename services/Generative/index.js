// generate random string for (password, login, username, etc...)
exports.generateString = (length, chars) => {
  return Array(length)
    .fill("")
    .map((v) => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

exports.encryptUserID = (personneID) => {
  return this.generateString(11, personneID);
};
