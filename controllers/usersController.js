const router = require("express").Router();
const { createNewUser, getAllUsers, loginExistingUser } = require("../models/userModel");

router.get("/", getAllUsers);
router.post("/register", createNewUser);
router.post("/login", loginExistingUser);

module.exports = router;
