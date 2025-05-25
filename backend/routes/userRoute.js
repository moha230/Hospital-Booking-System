import express from 'express';
import { userRegistration,loginUser, getUserProfile} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();


// route to register new  user 
userRouter.post("/register", userRegistration)

//route for user to login 
userRouter.post('/login',loginUser)


//route to get user profile 
userRouter.get('/get-profile',authUser,getUserProfile)

export default userRouter