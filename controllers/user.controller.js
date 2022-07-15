const { User } = require("../models");

const { imagekit } = require("../lib/imagekit");

module.exports = {
  whoAmI: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      };

      return res.success("Success retreived data", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const avatar = req.file.buffer.toString("base64");
      const fileName = `avatar - ${req.file.originalname}`;

      const uploadAvatar = await imagekit.upload({
        file: avatar,
        fileName,
      });

      await User.update(
        {
          avatar: uploadAvatar.url,
        },
        { where: { id: req.user.id } }
      );

      const payload = {
        id: req.user.id,
        avatar: req.user.avatar,
      };

      return res.success("User updated", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name } = req.body;

      if (name) req.body.name = name;

      await User.update(
        {
          name,
        },
        { where: { id: req.user.id } }
      );

      const payload = {
        id: req.user.id,
        name,
      };

      return res.success("User updated", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};
