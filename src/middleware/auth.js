const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decode;
        next();
    } catch(error){
        res.json({
            error: "Invalid Token"
        })
        console.log(error)
    }
}

module.exports = {verifyToken}