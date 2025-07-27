import mongoose from "mongoose";

const vihicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],  
    },
    name: {
        type: String,
        required: [true, 'Vehicle name is required'],
        trim: true,
        maxlength: [100, 'Vehicle name cannot exceed 100 characters']
      },
      capacityKg: {
        type: Number,
        required: [true, 'Vehicle capacity is required'],
        min: [1, 'Capacity must be at least 1 kg'],
        max: [50000, 'Capacity cannot exceed 50,000 kg']
      },
      tyres: {
        type: Number,
        required: [true, 'Number of tyres is required'],
        min: [2, 'Vehicle must have at least 2 tyres'],
        max: [18, 'Vehicle cannot have more than 18 tyres']
      }
    },
    {
        timestamps:true
    }
);

const Vehicle = mongoose.model("Vehicle",vihicleSchema);
export default  Vehicle;