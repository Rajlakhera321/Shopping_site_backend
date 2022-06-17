const express = require("express");
const router = express.Router();
const {cart} = require("../controller");
const {auth} = require("../middleware")

router.post("/",auth.verifyToken,cart.addCart);

router.delete("/delete/:id",cart.deleteToCart);

module.exports = router