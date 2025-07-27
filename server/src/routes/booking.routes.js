import express from "express";
import { bookVehicle, cancleBooking, getAllBookings, getAllCancelBookings } from "../controllers/booking.controller.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.post("/book-vehicle/:id",verifyToken,bookVehicle);
router.get("/user-bookings",verifyToken,getAllBookings);
router.put("/cancel-booking/:id",verifyToken,cancleBooking);
router.get("/user-cancelled-bookings",verifyToken,getAllCancelBookings);
export default router;