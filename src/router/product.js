const express = require("express")
const router = express.Router();
const {product} = require("../controller");

router.post("/",product.addProduct);

router.put("/update/:id",product.updateProduct);

router.delete("/delete/:id",product.deleteProduct);

module.exports = router