const express = require("express");
const { payment } = require("../controller");
const router = express.Router();

router.post("/payment", payment.addPayment)

module.exports= router