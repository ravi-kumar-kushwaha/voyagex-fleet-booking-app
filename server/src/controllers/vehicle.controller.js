import Booking from "../models/booking.model.js";
import Vehicle from "../models/vehicle.model.js";
import calculatedRideDuration from "../utils/rideDuration.js";
const addVehicle = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const { name, capacityKg, tyres } = req.body || {};

    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (capacityKg < 1 || capacityKg > 50000) {
      return res.status(400).json({
        message: "Capacity must be between 1 and 50000",
        success: false,
      });
    }

    if (tyres < 2 || tyres > 18) {
      return res.status(400).json({
        message: "Tyres must be between 2 and 18",
        success: false,
      });
    }
    const existingVehicle = await Vehicle.findOne({ name });
    if (existingVehicle) {
      return res.status(400).json({
        message: `Vehicle with the same name ${existingVehicle.name} already exists`,
        success: false,
      });
    }
    const vehicle = await Vehicle.create({
      userId,
      name,
      capacityKg,
      tyres,
    });

    if (!vehicle) {
      return res.status(400).json({
        message: "Vehicle not created",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Vehicle created successfully",
      success: true,
      data: vehicle,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

const getAvailableVehicles = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const { capacityRequired, fromPincode, toPincode, startTime } =
      req.query || {};
    if (!startTime || !fromPincode || !toPincode || !capacityRequired) {
      return res.status(400).json({
        message:
          "Missing required parameters: startTime, fromPincode, toPincode and capacityRequired are required",
        success: false,
      });
    }

    if (!/^\d{6}$/.test(fromPincode) || !/^\d{6}$/.test(toPincode)) {
        return res.status(400).json({
          message: "Invalid pincode format. Pincodes must be exactly 6 digits",
          success: false,
        });
      }

    let duration = calculatedRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const now = new Date();
    if (start <= now) {
      return res.status(400).json({
        message: "Start time must be greater than current time",
        success: false,
      });
    }

    const vehicles = await Vehicle.find({
      capacityKg: {
        $gte: parseInt(capacityRequired),
      },
    });

    if (!vehicles || vehicles.length === 0) {
      return res.status(400).json({
        message: "No vehicles found matching capacity requirements",
        success: true,
        data: {
          availableVehicles: [],
          estimatedRideDurationHours: duration,
        },
      });
    }

    let availableVehicles = [];

    for (const vehicle of vehicles) {
      const conflictingBooking = await Booking.findOne({
        vehicleId: vehicle._id,
        status: "active",
        $or: [
          {
            startTime: { $lte: end },
            endTime: { $gte: start },
          },
        ],
      });
      if (!conflictingBooking) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours: duration,
        });
      }
    }

    return res.status(200).json({
      message: `${availableVehicles.length} vehicles available`,
      success: true,
      data: {
        availableVehicles,
        estimatedRideDurationHours: duration,
        searchCriteria: {
          capacityRequired: parseInt(capacityRequired),
          startTime,
          endTime: end,
          fromPincode,
          toPincode,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export { addVehicle, getAvailableVehicles };
