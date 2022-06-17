const {userModel} = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    try {
        const {password} = req.body
        req.body.password = await bcrypt.hash(password.toString(), 10)
        const user = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        }
        console.log(user, "salfjkasdfl")
        const a = await userModel.create(user);
        res.json({
            message: "SignUp Successfully"
        })
    } catch (error) {
        res.status(401).send(error);
        console.log(error,"adlasfjosadfjowelfjwof")
    }
}

const generateToken = (user) => {
    return jwt.sign({ data: user }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_IN
    })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email: email });
        if (!data) {
            return res.status(400).json({ message: 'email is not exist' });
        }
        else {
            const isMatch = bcrypt.compare(password, data.password)
            if(isMatch){
                return res.status(200).json({
                    message: 'login success',
                    token: generateToken(data),
                    data
                })
            }else{
                return res.status(400).json({message: "Please enter correct password"});
            }
        }
    } catch (error) {
        console.log("error-------", error)
        return res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = {
    signUp,
    login
}