import express from 'express';
import { adminAddDoctor,loginAdmin } from '../controllers/adminController.js';
import upload from "../middlewares/multer.js";
import authAdmin from '../middlewares/authAdmin.js';


// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();

// route to login for admin
adminRouter.post('/login', loginAdmin);

// Route to add a new doctor
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), adminAddDoctor);









export default adminRouter;

