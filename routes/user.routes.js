const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/detail", authMiddleware.userAuth, userController.whoAmI);

router.put("/update", authMiddleware.userAuth, userController.updateUser);
router.put(
  "/upload/avatar",
  authMiddleware.userAuth,
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;
