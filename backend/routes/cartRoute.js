import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { addToCart, getUserCart, updateCart } from '../controller/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/get', isAuth, getUserCart)
cartRouter.post('/add', isAuth, addToCart)
cartRouter.post('/update', isAuth, updateCart)

export default cartRouter