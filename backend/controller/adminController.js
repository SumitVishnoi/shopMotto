import dotenv from 'dotenv'
import { genToken1 } from '../config/token.js';

dotenv.config()

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = await genToken1(email);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            return res.status(200).json({ message: "Login successful", token });
        }

        return res.status(400).json({ message: "Invalid credentials" });
    } catch (error) {
        console.error("adminLogin error:", error);
        return res.status(500).json({ message: `adminLogin error: ${error.message}` });
    }
};


//get admin 
export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;

        if (!adminEmail) {
            return res.status(400).json({
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            message: "Welcome Admin",
            email: adminEmail,
            role: "admin"
        });

    } catch (error) {
        return res.status(500).json({ message: `getAdmin error: ${error.message}` });
    }
}