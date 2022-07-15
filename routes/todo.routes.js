const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware.userAuth, todoController.createTodo);

router.get("/all", authMiddleware.userAuth, todoController.listTodo);

module.exports = router;
