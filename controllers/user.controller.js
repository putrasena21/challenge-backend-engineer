const { User } = require("../models");

module.exports = {
  whoAmI: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return res.success("Success retreived data", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};
