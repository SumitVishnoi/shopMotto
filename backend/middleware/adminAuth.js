import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;


        if (!token) {
            return res.status(401).json({ message: "No token found. Please login." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: "Unauthorized admin access" });
        }

        req.adminEmail = decoded.email;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return res.status(401).json({ message: `Token error: ${error.message}` });
    }
};

export default adminAuth;
