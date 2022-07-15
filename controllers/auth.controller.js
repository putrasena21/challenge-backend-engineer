const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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

      const { email, password, name } = req.body;

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
        name,
      });

      const payload = {
        id: newUser.id,
        email,
        name,
      };

      return res.created("User created", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  login: async (req, res) => {
    try {
      const check = await validator.validateLogin(req.body);

      if (check.length) {
        return res.badRequest("Invalid input", check);
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.notFound("User not found");
      }

      const passwordValid = await bcryptHelper.checkPassword(
        password,
        user.password
      );
      if (!passwordValid) {
        return res.badRequest("Wrong password!");
      }

      const payload = {
        id: user.id,
      };

      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      return res.success("Login success", { accessToken });
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};
