import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js';
import {signup,signout,login,update} from '../controllers/auth.controller.js'
import User from '../models/user.model.js';

const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',signout)

router.put('/update',protectRoute,update)

router.get('/check',protectRoute, async (req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findOne({_id:userId}).select("-password");
        if(!user){
           return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json(user);
    }catch(error){
        console.log("error in check route");
        return res.status(500).json({message:"internal server error"});
    }
});


export default router;