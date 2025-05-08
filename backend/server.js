import connectDB from './config/mongodb.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRouter from './routes/adminRoute.js';
import connectCloudinary from './config/Cloudinary.js';



const app = express();
const port = process.env.port || 3000;
connectDB();
connectCloudinary();





// Middleware to parse JSON request bodies

app.use(cors());
app.use(express.json());





// Define API endpoints using base URL: http://localhost:3000/api/v1/admin
// localhost:3000/api/v1/admin
app.use("/api/v1/admin", adminRouter);






app.listen(port, () => {
  console.log("server is running",port);
})

//npm start dev 