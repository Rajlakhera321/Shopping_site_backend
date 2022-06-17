const {Schema, model} = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.String,
        required: true
    },
    products: [{
        productId: {
            type:Schema.Types.String,
            required: true
        },
        quantity: {
            type: Schema.Types.Number,
            default: 1
        }
    }],
    amount: {
        type: Schema.Types.Number,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        default: "pending"
    }
})

module.exports = model("order", orderSchema)