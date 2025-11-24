import express from 'express'
import { addProduct, listProduct, removeProduct } from '../controller/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
let productRouter = express.Router()

productRouter.post('/addproduct', upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1},
]), addProduct)

productRouter.get("/list", listProduct)
productRouter.post("/remove/:id", adminAuth, removeProduct)

export default productRouter