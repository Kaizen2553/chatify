import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js'


const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
// //express.json() is a middleware in Express.

// It reads JSON data from the request body and converts it into a JavaScript object available as req.body.



app.use("/api/auth",authRoutes);
app.use('/api/message',messageRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
})