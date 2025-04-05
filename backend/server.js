import connectDB from './config/mongodb.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRouter from './routes/adminRoute.js';



const app = express();
const port = process.env.port || 3000;
connectDB();



// middlewares 

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());


// Define API endpoints using base URL: http://localhost:3000/api/v1/admin
// This means all routes inside `adminRouter` will be prefixed with `/api/v1/admin`
app.use("/api/v1/admin", adminRouter);






app.listen(port, () => {
  console.log("server is running",port);
})

//npm start dev 