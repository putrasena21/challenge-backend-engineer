const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware.userAuth, todoController.createTodo);

router.get("/all", authMiddleware.userAuth, todoController.listTodo);
router.get(
  "/detail/:todoId",
  authMiddleware.userAuth,
  todoController.detailTodo
);

router.put(
  "/update/:todoId",
  authMiddleware.userAuth,
  todoController.updateTodo
);

router.delete(
  "/delete/:todoId",
  authMiddleware.userAuth,
  todoController.deleteTodo
);

module.exports = router;
