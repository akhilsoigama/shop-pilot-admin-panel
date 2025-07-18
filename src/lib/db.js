import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connction = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection successfull with mongoDB", connction)
    } catch (error) {
        console.log("Connection error in mongoDB", error)
    }
}