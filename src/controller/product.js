const { productModel } = require("../model");

const addProduct = async (req, res) => {
  try {
    const { title, description, categories, color, size, price } = req.body;
    const fileData = req.file;
    const add = await productModel.create({
      title,
      description,
      image: fileData?.originalname,
      categories: JSON.parse(categories),
      color: JSON.parse(color),
      size: JSON.parse(size),
      price,
      inStock: true,
    });
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "Internal Server Error"});
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await productModel.findById(id);
    if (!checkId) {
      res.status(400).json({ message: "Product Doesn't exist, Invalid id" });
    } else {
      await productModel.updateOne(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      res.status(201).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await productModel.findById(id);
    if (!checkId) {
      res.status(400).json({ message: "Product Doesn't exist, Invalid id" });
    } else {
      await productModel.deleteOne({ _id: id });
      res.status(201).json({ message: "Product Deleted successfully" });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    if (category) {
      var data = await productModel.find({
        inStock: true,
        categories: category ? { $in: [category] } : "",
      });
    } else {
      var data = await productModel.find({ inStock: true });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
