import userModel from "../models/userModel.js"


export const addToCart = async (req, res) => {
    try {
        const {itemId, size} = req.body

        const userData = await userModel.findById(req.userId)

        //check if user exists
        if(!userData) {
            return res.status(400).json({message:"User not found"})
        }

        //Ensure cartData is initialized
        let cartData = userData.cartData || {}

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(req.userId,{cartData})

        return res.status(201).json({message: "Added to cart"})
    } catch (error) {
        return res.status(500).json({message: `addToCart error ${error}`})
    }
}

export const updateCart = async(req, res)=> {
    try {
        const {itemId, size, quantity} = req.body
        const userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(req.userId, {cartData})

        return res.status(201).json({message: "cart updated"})
    } catch (error) {
        return res.status(500).json({message: `update cart error ${error}`})
    }
}

export const getUserCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId)
        let cartData = await userData.cartData

        return res.status(200).json(cartData)
    } catch (error) {
        return res.status(500).json({message: `getUserCart error ${error}`})
    }
}


