import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "All fields are required",
        success:false
     });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not created",
        success: false,
      });
    }

    return res.status(201).json({
      message: `${user.name} registered successfully`,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"+ error.message,
      success: false,
    });
  }
};

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body || {};
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required",
                success:false 
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found!",
                success:false
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid Credetial Password does not matched!",
                success:false
            });
        }

        const accessToken = jwt.sign({
            _id:user._id,
             name:user.name,
             email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRES
        }
        );

        const refreshToken = jwt.sign({
            _id:user._id,
             name:user.name,
             email:user.email
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn:process.env.JWT_REFRESH_EXPIRES
        }
        );
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        }
        user.refreshToken = refreshToken;
        await user.save();
        return res.cookie("refreshToken",refreshToken,options).
        cookie("accessToken",accessToken,options).
        status(200).json({
            message:`${user.name} loggedin successfully!`,
            success:true,
            data:user,
            refreshToken,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"+ error.message,
            success: false,
          });
    }
}
export { registerUser,loginUser };