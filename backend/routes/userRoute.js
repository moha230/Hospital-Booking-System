import express from 'express';
import { userRegistration } from '../controllers/userController.js';

const userRouter = express.Router();


// route to register new  user 
userRouter.post("/register", userRegistration)




export default userRouter