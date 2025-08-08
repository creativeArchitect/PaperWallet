import mongoose from "mongoose";

const connectDB = async ()=> {
    const connect = await mongoose.connect(process.env.DATABASE_URI as string);
}

export default connectDB;