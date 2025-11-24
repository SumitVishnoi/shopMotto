import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrder, PlaceOrder, updateStatus, userOrder } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post("/placeorder", isAuth, PlaceOrder)

//placeOrder Online
orderRouter.post("/userorder", isAuth, userOrder)


//for admin
orderRouter.post("/list", adminAuth, allOrder)
orderRouter.post("/status", adminAuth, updateStatus)


export default orderRouter