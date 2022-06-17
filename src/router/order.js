const express = require("express");
const router = express.Router();
const {order} = require("../controller");
const {auth} = require("../middleware")

router.post("/",auth.verifyToken,order.addOrder);

router.delete("/delete/:id",order.deleteOrder);

module.exports =router