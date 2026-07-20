import mongoose from "mongoose";

const connectDB = async () => {
    const URL = process.env.MONGODB_URL;
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

export default connectDB;