const express = require("express");
const router = express.Router();
const { product } = require("../controller");
const { file } = require("../middleware");

router.post("/", file.imageUpload.single("image") ,product.addProduct);

router.put("/update/:id", product.updateProduct);

router.delete("/delete/:id", product.deleteProduct);

router.get("/products", product.getProducts);

module.exports = router;
