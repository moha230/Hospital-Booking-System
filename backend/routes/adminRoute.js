import express from 'express';
import { adminRegisterDoctor,loginAdmin,adminListDoctors } from '../controllers/adminController.js';
import upload from "../middlewares/multer.js";
import authAdmin from '../middlewares/authAdmin.js';


// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();

// route to login for admin
adminRouter.post('/login', loginAdmin);

// Route to add a new doctor
adminRouter.post('/doctor-registration',authAdmin, upload.single('image'), adminRegisterDoctor);

// route to list all doctors for admin
adminRouter.post('/list-all-doctors',authAdmin, adminListDoctors);













export default adminRouter;

