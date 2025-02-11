import connectDB from './config/mongodb.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import adminRouter from './routes/adminRoute.js';



const app = express();
const port = process.env.port || 3000;
connectDB();



// middlewares 

app.use(express.json());
app.use(cors());


//api endpoints use localhost:3000/api/v1/add-doctor
app.use("/api/v1/admin",adminRouter)



app.get("/", (req,res) => {
   res.send("Hello its time to ride hello");
})

app.listen(port, () => {
  console.log("server is running",port);
})

//npm start dev 