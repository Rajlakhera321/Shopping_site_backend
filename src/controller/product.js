const {productModel} = require("../model");

const addProduct = async (req, res) => {
    const { title, description, image, categories, color, size, price } = req.body
    try {
        const add = await productModel.create({
            title,
            description,
            image,
            categories,
            color,
            size,
            price
        });
        res.status(200).json({ message: "Product added successfully" })
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const checkId = await productModel.findById(id)
        if (!checkId) {
            res.status(400).json({ message: "Product Doesn't exist, Invalid id" })
        } else {
            await productModel.updateOne({ _id: id }, { $set: req.body }, { new: true })
            res.status(201).json({ message: "Product updated successfully" })
        }

    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const checkId = await productModel.findById(id)
        if (!checkId) {
            res.status(400).json({ message: "Product Doesn't exist, Invalid id" })
        } else {
            await productModel.deleteOne({ _id: id })
            res.status(201).json({ message: "Product Deleted successfully" })
        }
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct
}