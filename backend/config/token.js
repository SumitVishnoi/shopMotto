import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const genToken = async (userId) => {
    try {
        let token = await jwt.sign({userId}, 
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )
        return token
    } catch (error) {
        res.status(500).json({message: `token error ${error}`})
    }
}


export const genToken1 = async (email) => {
    try {
        console.log("[genToken1] JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Token generation failed");
    }
};

