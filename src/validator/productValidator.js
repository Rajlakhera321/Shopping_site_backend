const {body} = require("express-validator");
const {productModel} = require("../model")

const productValidator = () => {
    return [
        body("title").not().notEmpty().withMessage("Please enter title"),
        body("description").not().notEmpty().withMessage("Please enter description").islength({min:15}).withMessage("description should be atleast of length of 15"),
        body("image").not().notEmpty().withMessage("Please pass the image"),
        body("price").not().notEmpty().withMessage("Please enter the price")
        ]
}

module.exports = productValidator