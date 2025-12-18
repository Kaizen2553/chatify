import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js';
import {signup,signout,login,update} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',signout)

router.put('/update',protectRoute,update)

router.get('/check',protectRoute,(req,res)=>{
    return res.status(200).json(req.userId)
});


export default router;