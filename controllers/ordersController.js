const router = require("express").Router();
const { verifyToken } = require("../authentication/auth");
const { createNewOrder, getOrder } = require("../models/orderModel");

router.get("/", verifyToken, getOrder);
router.post("/", verifyToken, createNewOrder);

module.exports = router;
