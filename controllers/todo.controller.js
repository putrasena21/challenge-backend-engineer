const { User, Todo } = require("../models");

module.exports = {
  createTodo: async (req, res) => {
    try {
      const { title, description } = req.body;

      await Todo.create({
        userId: req.user.id,
        title,
        description,
      });

      const payload = {
        title,
        description,
      };

      return res.created("Todo created", payload);
    } catch (err) {
      return res.serverError(err.message);
    }
  },

  listTodo: async (req, res) => {
    try {
      const listTodo = await User.findAll({
        attributes: ["id", "email", "name"],
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: Todo,
            as: "list",
            attributes: ["id", "title", "description"],
          },
        ],
      });

      return res.success("Success get all data", listTodo);
    } catch (err) {
      return res.serverError(err.message);
    }
  },
};
