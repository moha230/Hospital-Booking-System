import express from 'express';
import { userRegistration, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();


// route to register new  user 
userRouter.post("/register", userRegistration)

//route for user to login 
userRouter.post('/login', loginUser)


//route to get user profile 
userRouter.get('/get-profile', authUser, getUserProfile)

//route to update userProfile 
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile)

export default userRouter