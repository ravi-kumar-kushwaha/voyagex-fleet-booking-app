import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:process.env.CLIENT_URL,
        credentials:true
    }
));
app.use(cookieParser());


//Database Connection
import connectDb from "./config/db.js";
connectDb();

//user routes
import userRoutes from './routes/user.routes.js';
app.use("/api/v1/user/", userRoutes);

//vehicle routes
import vehicleRoutes from './routes/vehicle.routes.js';
app.use("/api/v1/vehicles/", vehicleRoutes);

//booking routes
import bookingRoutes from './routes/booking.routes.js';
app.use("/api/v1/booking/", bookingRoutes);
export default app;