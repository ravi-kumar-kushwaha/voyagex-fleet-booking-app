import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import calculatedRideDuration from "../utils/rideDuration.js";
const bookVehicle = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const vehicleId = req.params.id;
    if (!vehicleId) {
      return res.status(400).json({
        message: "vehicleId is required",
        success: false,
      });
    }

    const { fromPincode, toPincode, startTime } = req.body || {};
    if (!fromPincode || !toPincode || !startTime) {
      return res.status(400).json({
        message: "Required fields : fromPincode,toPincode,startTime",
        success: false,
      });
    }

    if (!/^\d{6}$/.test(fromPincode) || !/^\d{6}$/.test(toPincode)) {
        return res.status(400).json({
          message: "Invalid pincode format. Pincodes must be exactly 6 digits",
          success: false,
        });
      }

    const duration = calculatedRideDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(400).json({
        message: "Vehicle not found",
        success: false,
      });
    }
    const now = new Date();
    if (start <= now) {
      return res.status(400).json({
        message: "Start time must be greater than current time",
        success: false,
      });
    }

    const conflictingBookings = await Booking.findOne({
      vehicleId:vehicle._id,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } },
      ],
    });

    if(conflictingBookings){
        return res.status(409).json({
            message:"Conflicting Bookings vehicle is already Booked",
            success:false
        })
    }

    const booking = await Booking.create({
      customerId:userId,
      vehicleId,
      fromPincode,
      toPincode,
      startTime,
      endTime: end,
      estimatedRideDurationHours: duration,
      status: "active",
    });

    if (!booking) {
      return res.status(400).json({
        message: "Something went wrong while creating booking",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Booking created successfully",
      success: true,
      data: booking,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({
      message: "UserId is required to get all bookings",
      success: false,
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  try {
    const bookings = await Booking.find({customerId:userId,status:"active"}).populate("vehicleId").sort({createdAt:-1});
    if (!bookings) {
      return res.status(404).json({
        message: "Bookings not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Bookings found successfully",
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const cancleBooking = async (req, res) => {
 try {
   const userId = req.user._id;
   if (!userId) {
     return res.status(400).json({
       message: "UserId is required for cancel the booking",
       success: false,
     });
   } 

   const user = await User.findById(userId);
   if (!user) {
     return res.status(400).json({
       message: "User not found",
       success: false,
     });
   }
   
   const bookingId = req.params.id;
   if (!bookingId) {
     return res.status(400).json({
       message: "bookingId is required for cancel the booking",
       success: false,
     });
   }

   const booking = await Booking.findById(bookingId);
   if (!booking) {
     return res.status(404).json({
       message: "Booking not found",
       success: false,
     });
   }

   if (booking.customerId.toString() !== userId.toString()) {
     return res.status(403).json({
       message: "You are not authorized to cancel this booking",
       success: false,
     });
   }

  const cancelledBooking = await Booking.findByIdAndUpdate(bookingId, {status:"cancelled"},{new:true});
   return res.status(200).json({
     message: "Booking cancelled successfully",
     success: true,
     data: cancelledBooking,
   });

 } catch (error) {
   return res.status(500).json({
     message: "Internal Server Error",
     success: false,
     error: error.message,
   });
 }
};

const getAllCancelBookings = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(400).json({
      message: "UserId is required to get all bookings",
      success: false,
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }

  try {
    const bookings = await Booking.find({customerId:userId,status:"cancelled"}).populate("vehicleId").sort({createdAt:-1});
    if (!bookings) {
      return res.status(404).json({
        message: "Bookings not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All Cancled Bookings found successfully",
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export { bookVehicle,getAllBookings,cancleBooking,getAllCancelBookings };