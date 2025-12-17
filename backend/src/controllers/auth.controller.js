
import express from "express";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        if(!fullName||!email||!password){
            return res.status(400).json({message:"all fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"password must be atleast 6 characters"});
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email))return res.status(400).json({message:"Invalid email format"});

        const user = await User.findOne({email});

        if(user){
            res.status(400).json({message:'user already present with this email'});
            return;
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:fullName,
                email:email,
            })
            // todo:send a welcome email to the user
        }else{
            res.status(400).json({message:"invalid user access"});
        }

    }catch(error){
       console.log("error in signup controller",error);
       res.status(500).json({message:"internal server error"});
    }
}


export const signout = (req,res)=>{
    res.send("signout endpoint");
}

export const login = (req,res)=>{
    res.send("login");
}
