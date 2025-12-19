import User from "../models/user.model.js"
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req,res)=>{
    try{

        const allContacts = await User.find({_id: {$ne: req.userId}});
        return res.status(200).json(allContacts);

    }catch(error){
        console.log("error in getAllcontacts",error);
        return res.status(500).json({message:"internal server error"});
    }


}

export const getMessagesById = async (req,res)=>{

    try{
        const id = req.params.id;
        const messages = await Message.find({
          $or:[
           {senderId:id,receiverId:req.userId},
           {senderId:req.userId,receiverId:id},
        ]});
        return res.status(200).json(messages);
    }catch(error){
        console.log('error in getMessagesById',error);
        return res.status(500).json({message:"internal server error"});
    }
     

}

export const sendMessage = async (req,res) => {
  
  try{
      const id = req.params.id;
      const {message,image} = req.body;
      const exists = await User.exists({_id:id});
      if(!exists){
        return res.status(404).json({message:"receiver not found"});
      }

      if(req.userId.toString()===id){
        return res.status(400).json({message:"you cannot message yourself"});
      }
      if((!message || !message.trim()) && !image){
        return res.status(400).json({message:'message field empty'});
      }


      let imageUrl = "";
      if(image){
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId:req.userId,
        receiverId:id,
        text:message,
        image:imageUrl,
      });

      if(newMessage){
        const savedMessage = await newMessage.save();
        return res.status(201).json(savedMessage);
      }else{
        return res.status(400).json({message:"some error occurred"});
      }

      
  }catch(error){
         console.log("error in sendMessage",error);
         return res.status(500).json({message:"internal server error"});
  }


}

export const getChatPartners = async(req,res)=>{

   try{

        const chatUsers = await Message.find({
            $or:[
                {senderId:req.userId},
                {receiverId:req.userId}
            ]
        });

        const chatPartnerIds =[...new Set(chatUsers.map((msg)=>{
           return (msg.senderId.toString()===req.userId)?msg.receiverId.toString():msg.senderId.toString();
        }))];


        const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password");

        return res.status(200).json(chatPartners);



   }catch(error){
       console.log("error in getChatPartner",error);
       return res.status(500).json({message:"internal server error"});
   }

}