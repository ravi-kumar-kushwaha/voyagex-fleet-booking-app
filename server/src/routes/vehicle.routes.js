import express from "express";
import { addVehicle, getAvailableVehicles } from "../controllers/vehicle.controller.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();
router.post("/add-vehicle",verifyToken,addVehicle );
router.get("/available",verifyToken,getAvailableVehicles);

export default router;