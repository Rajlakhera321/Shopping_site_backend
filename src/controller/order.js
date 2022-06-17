const {orderModel} = require("../model");

const addOrder = async (req, res) => {
    const userId = req.userData.data._id
    try {
        const getData = await orderModel.findOne({userId: userId})
        const {
        products,
        amount,
        address,
        status
        } = req.body
        if(getData){
            const total_amount = getData.amount + amount
                await orderModel.updateOne({ userId: userId }, { "$push": { "products": products},$set: {amount: total_amount}})
                res.status(201).json({ message: "one more added" })
        }else{
            await orderModel.create({
                userId,
                products,
                amount,
                address,
                status
            })
            return res.status(200).json({message: "Order placed successfully"})
        }
    } catch (error) {
        res.status(404).json({message: "Internal Server Error"})
    }
}

const deleteOrder = async (req, res) => {
    const userId = req.params.id
    console.log(userId)
    try {
        const getData = await orderModel.findById({_id: userId})
        const {productId,amount} = req.body
        if(getData){
            if(productId){
                const total_amount = getData.amount - amount
                await orderModel.findByIdAndUpdate({_id: userId},{$pull: {"products": {productId}},$set: {amount: total_amount}})
                return res.status(201).json({message: "product deleted Successfully"})
            }
            else{
                await orderModel.deleteOne({_id: userId});
                return res.status(200).json({message: "Order Deleted Successfully"})
            }
        }else{
            res.status(400).json({message: "Invalid id, order not found"});
        }
    } catch (error) {
        res.status(404).json({message: "Internal server error"});
    }
}

module.exports = {
    addOrder,
    deleteOrder
}