const bcrypt = require("bcrypt");

const { SALT } = process.env;

module.exports = {
  hashPassword: (password) => {
    const hashedPassword = bcrypt.hashSync(password, parseInt(SALT, 10));

    return hashedPassword;
  },

  checkPassword: async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
  },
};
