const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/detail", authMiddleware.userAuth, userController.whoAmI);

module.exports = router;
