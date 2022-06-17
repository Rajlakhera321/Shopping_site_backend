const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    userName: {
        type:Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        default: false
    }
},{timestamps: true})

module.exports = model("User",userSchema);  