const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/add-user", userController.addUser);

router.post("/check-user", userController.checkUser);

router.get("/get-users/:page", authMiddleware, userController.getUsers);

module.exports = router;
