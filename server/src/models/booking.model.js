import mongoose from "mongoose";
const bookingSchema = mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: [true, "Vehicle ID is required"],
  },
  customerId: {
    type: String,
    required: [true, "Customer ID is required"],
    ref: "User",
    trim: true,
  },
  fromPincode: {
    type: String,
    required: [true, "From pincode is required"],
    match: [/^\d{6}$/, "Pincode must be 6 digits"],
  },
  toPincode: {
    type: String,
    required: [true, "To pincode is required"],
    match: [/^\d{6}$/, "Pincode must be 6 digits"],
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
  },
  estimatedRideDurationHours: {
    type: Number,
    required: true,
    min: [0, "Duration cannot be negative"],
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
},{
    timestamps:true
});


bookingSchema.pre("save", function (next) {
    if(this.startTime >= this.endTime){
        return next(new Error("Start time cannot be greater than end time"));
    }
    next();
})
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;