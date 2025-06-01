import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/Cloudinary.js';

import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js'; 
import userRouter from './routes/userRoute.js'; 


const app = express();
const port = process.env.PORT || 3000;

// Connect to DB and Cloudinary
connectDB();

connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("API is working (200)");
});

// Start server at port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
