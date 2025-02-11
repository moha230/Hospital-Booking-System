import express from 'express';
import cors from 'cors';
import 'dotenv/config';


const app = express();
const port = process.env.port || 3000;


// middlewares 

app.use(express.json());
app.use(cors());


//api endpoints 


app.get("/", (req,res) => {
   res.send("Hello its time to ride");
})

app.listen(port, () => {
  console.log("server is running",port);
})