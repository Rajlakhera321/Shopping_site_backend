const {Schema, model} = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.String,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId
        },
        quantity: {
            type: Schema.Types.String
        }
    }]
},{timestamps: true})

module.exports = model("cart", cartSchema)