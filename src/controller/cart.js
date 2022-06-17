const { cartModel } = require("../model");
const {verifyToken} = require("../middleware/auth")

const addCart = async (req, res) => {
    try {
        const id = (req.userData.data._id)
        const checkId = await cartModel.findOne({ userId: id })
        if (checkId) {
            const {productId,quantity} = req.body.products
            for(var i= 0; i < checkId.products.length; i++){
                if(checkId.products[i].productId == productId){
                    const product_Id = checkId.products[i]._id
                    console.log(product_Id)
                    const ab = await cartModel.updateOne({"products._id": product_Id}
                    ,{$set: {"products.$.quantity":quantity}})
                    return res.json({msg: "success"})
                }
            }
            for(var i= 0; i<= checkId.products.length; i++){
                if(checkId.products[i].productId != productId){
                    await cartModel.updateOne({ userId: id }, { "$push": { "products": req.body.products } })
                    return res.status(201).json({ message: "one more added" })
                }
            }
        } else {
            const userId = req.userData.data._id
            const { products } = req.body
            console.log(products)
            const add = await cartModel.create({ userId, products })
            res.status(200).json({ message: "Cart added successfully" })
        }
    } catch (error) {
        res.status(404).json({ message: "internal server error" })
        console.log(error)
    }
}

const deleteToCart = async (req, res) => {
    const {id: _id} = req.params
    console.log(_id)
    try {
        const {productId} = req.body
        const getId = await cartModel.findById({_id: _id})
        if(!getId){
            res.status(400).json({message: "Cart doesn't exist"})
        }else{
            if(productId){
                await cartModel.updateOne({_id: _id},{$pull: {"products": {productId}}})
                return res.status(201).json({message: "product deleted Successfully"})
            }else{
                await cartModel.findByIdAndDelete({_id: _id})
                return res.status(200).json({message: "cart deleted successfully"})
            }
        }
    } catch (error) {
        res.status(404).json({message: "Internal Server Error"})
        console.log(error)
    }
}

module.exports = {
    addCart,
    deleteToCart
};