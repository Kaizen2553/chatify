import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{

    try{

        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"token not found"});
        }
    
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!verifyToken){
            return res.status(401).json({message:"invalid token"});
        }
    
        const user = await User.findById(verifyToken.userId).select("-password");
    
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
    
        req.userId = user._id;
        next();
    }catch(error){
        console.log("error in protectRoute",error);
        return res.status(500).json({message:"internal server error"});
    }




}