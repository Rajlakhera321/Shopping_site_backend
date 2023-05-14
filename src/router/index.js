const express = require("express");
const router = express.Router();

router.use("/user",require("./user"));

router.use("/cart",require("./cart"))

router.use("/order",require("./order"))

router.use("/products",require("./product"))

router.use("/checkout", require("./stripe"))

module.exports = router