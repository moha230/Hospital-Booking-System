import express from 'express';
import { userRegistration,loginUser} from '../controllers/userController.js';

const userRouter = express.Router();


// route to register new  user 
userRouter.post("/register", userRegistration)

//route for user to login 
userRouter.post('/login',loginUser)


export default userRouter