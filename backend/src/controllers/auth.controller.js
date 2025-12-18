
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
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);
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


export const signout = (_,res)=>{
    res.cookie(
        "jwt",
        "",
        {maxAge:0},
    );
    return res.status(200).json({message:"user logged out"});
}

export const login = async (req,res)=>{

    try{
        
        const {email,password} = req.body;
    
        if(!email||!password){
            res.status(400).json({message:"fill all the fields"});
            return;
        }
    
        const validUser = await User.findOne({email});
        if(!validUser){
            res.status(400).json({message:"invalid credentials"});
            return;
        }
    
        const hashedPassword = validUser.password;
    
        const match = await bcrypt.compare(password,hashedPassword);
    
        if(match){
            generateToken(validUser._id,res);
            res.status(200).json(validUser);
            return ;
        }else{
            res.status(400).json({message:"invalid credentials"});
            return;
        }
    

    }catch(error){
        res.status(500).json({message:"internal server error"});
        console.log("error in login route",error.message());
        return;
    }  


    
}
