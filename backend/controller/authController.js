import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { genToken} from "../config/token.js";
import dotenv from 'dotenv'

dotenv.config()

//Registration
export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "Missing details"})
    }

    try {
        const existingUser = await userModel.findOne({email})

    if(existingUser) {
        return res.status(400).json({message: "User already exist"})
    }

    // if(!isValidator.isEmail(email)) {
    //     return res.status(400).json({message: "User alreay exist"})
    // }

    if(password.length < 8) {
        return res.status(400).json({message: "Enter Strong Password"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({name, email, password:hashedPassword})

    const token = await genToken(user._id)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        masAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json({success: true})
    } catch (error) {
        res.status(500).json({message: `Registeration error ${error}`})
    }
}

//Login
export const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({message: "User not found"})
    }

    try {
        const user = await userModel.findOne({email})

    if(!user) {
        return res.status(400).json({message: "Invalid Email and Password"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({message: "Invalid Email and Password"})
    }

    const token = await genToken(user._id)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        masAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(201).json({success: true})
    } catch (error) {
        res.status(500).json({message: `Login error ${error}`})
    }
}

//Logout
export const logout = async (req, res)=> {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "logout successfully"})
    } catch (error) {
        res.status(500).json({message: `Logout error ${error}`})
    }
}

