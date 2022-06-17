const {body} = require('express-validator');
const {userModel}  = require("../model");

const loginValidator = () => {
    return [
        body("email").not().notEmpty().withMessage("please Enter email").isEmail().withMessage("email should be email type")
        .custom(async value => {
            const data = await userModel.findOne({ email: value });
            if (data) {
                return Promise.reject("Email is already exist");
            }
        }),
        body("password").not().notEmpty().withMessage("Please enter password")
    ]
}

module.exports = loginValidator


