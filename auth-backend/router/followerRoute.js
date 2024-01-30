const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/AuthMiddleware");
const followerController = require("../controller/followerController");

router.patch("/add-follower", authMiddleware, followerController.addFollower);

module.exports = router;
