import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb  = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if(connection){
            console.log("Database connected successfully");
            console.log("Database name: "+ connection.connection.db.databaseName);
            console.log("Database host: "+ connection.connection.host);
        }else{
            console.log("Database connection failed");
        }
    } catch (error) {
        console.log("Error in database connection"+ error.message);
    }
}

export default connectDb;