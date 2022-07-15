const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: "userId",
        as: "listTodo",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://ik.imagekit.io/putrasena21/dummy/ava_VVnE9FdmP.png",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
