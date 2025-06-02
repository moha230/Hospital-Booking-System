import express from 'express';
import { userRegistration, loginUser, getUserProfile, updateUserProfile,bookAppointment, listAppointment, cancelAppointment, createPaymentIntent } from '../controllers/userController.js';
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

//route to book appointment 
userRouter.post('/book-appointment',authUser,bookAppointment)

//get user appointment 
userRouter.get('/appointments',authUser,listAppointment)


//cancel  user appointment 
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

// router.post('/create-payment-intent', authUser, createPaymentIntent);




export default userRouter


