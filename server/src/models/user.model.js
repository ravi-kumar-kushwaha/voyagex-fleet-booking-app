import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: [5, 'Password must have at least 5 characters'],
        max: [18, 'Password cannot have more than 15 characters'],
    },
    isAdmin: {
        type:String,
        enum:["user", "admin"],
        default:"user",
    },
    refreshToken:{
        type:String
    }
}, {
    timestamps: true,
}); 

const User = mongoose.model("User", userSchema);
export default User;