import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();
export const verifyToken = async(req,res,next)=>{
    const token  = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ","");
    if(!token){
        return res.status(404).json({
            message:"Unautherized User",
            success:false
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        if(!user){
            return res.status(404).json({
                message:"Un autherized user!",
                success:false
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error.message
        })
    }
}

export default verifyToken;