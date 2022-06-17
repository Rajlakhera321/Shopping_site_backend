const {body} = require("express-validator");
const {userModel} = require("../model")

const signUpValidator = async => {
    return [
        body("userName").not().notEmpty().withMessage("Please Enter userName").isLength({min:5,max:20}).withMessage("Please Enter word more than 5 and less than 21"),
        body("email").not().notEmpty().withMessage("please Enter email").isEmail().withMessage("email should be email type")
        .custom(value => {
            return userModel.findOne({email: value}).then(data => {
                if(data){
                    return Promise.reject("Email is already exist");
                }
            })
        }),
        body("password").not().notEmpty().withMessage("Please Enter Your Password").isLength({min: 8})
        .withMessage("Please Enter atleast 8 characters")
    ]
}

module.exports = signUpValidator