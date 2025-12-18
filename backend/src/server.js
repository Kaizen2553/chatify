import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
// //express.json() is a middleware in Express.

// It reads JSON data from the request body and converts it into a JavaScript object available as req.body.



app.use("/api/auth",authRoutes);
app.use('/api/message',messageRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})