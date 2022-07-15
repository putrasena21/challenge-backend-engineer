const { User, Todo } = require("../models");

module.exports = {
  user: () => User.destroy({ truncate: true, restartIdentity: true }),
  todo: () => Todo.destroy({ truncate: true, restartIdentity: true }),
};
