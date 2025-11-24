import Order from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv'


dotenv.config()




// //for user
export const PlaceOrder = async (req, res) => {
    try {
        const {items, amount, address} = req.body;

        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        return res.status(201).json({message: 'Order Placed'})
    } catch (error) {
        return res.status(500).json({message: `OrderPlace error ${error}`})
    }
}


//placeOrder Online using cashfree








export const userOrder = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message: `userOrder error ${error}`})
    }
}



// //for Admin
export const allOrder = async (req, res) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({message:`admin allOrder error ${error}`})
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status})
        return res.status(201).json({message:"Status updated"})
    } catch (error) {
        return res.status(500).json({message: `updateStatus error ${error}`})
    }
}

/////////////////////////////////////////////////////////////////////////////////////////

