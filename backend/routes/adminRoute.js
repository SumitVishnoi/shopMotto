import express from 'express'
import { adminLogin, getAdmin } from '../controller/adminController.js'
import adminAuth from '../middleware/adminAuth.js'


const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.get("/getadmin", adminAuth, getAdmin)

export default adminRouter