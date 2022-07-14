const { User } = require("../models");

const validator = require("../validator/user");
const bcryptHelper = require("../helpers/bcrypt.helper");

module.exports = {
  register: async (req, res) => {
    try {
      const check = await validator.validateRegis(req.body);

      if (check.length) {
        return res.badRequest("Invalid input", check);
      }

      const { email, password } = req.body;

      const encryptedPassword = bcryptHelper.hashPassword(password);

      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.conflict("User already exist");
      }

      const newUser = await User.create({
        email,
        password: encryptedPassword,
      });

      const payload = {
        id: newUser.id,
        email,
      };

      return res.created("User created", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};
