const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    image: {
        type: Schema.Types.String,
        required: true
    },
    categories: {
        type: Schema.Types.Array
    },
    size: {
        type: Schema.Types.String
    },
    color: {
        type: Schema.Types.Array
    },
    price: {
        type: Schema.Types.Number,
        required: true
    }
},{timestamps: true})

module.exports = model("product", productSchema)