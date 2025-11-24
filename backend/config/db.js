import mongoose from "mongoose";

const connectedDB = async (req, res)=> {
    mongoose.connection.on("connected", ()=> console.log("DB connected")
    )
    await mongoose.connect(process.env.MONGODB_URI)
}

export default connectedDB;