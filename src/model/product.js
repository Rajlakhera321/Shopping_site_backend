const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    image: {
      type: Schema.Types.String,
    },
    inStock: {
      type: Schema.Types.Boolean,
    },
    categories: {
      type: Schema.Types.Array,
    },
    size: {
      type: Schema.Types.Array,
    },
    color: {
      type: Schema.Types.Array,
    },
    price: {
      type: Schema.Types.Number,
    },
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
