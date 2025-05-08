import express from 'express';
import { adminAddDoctor } from '../controllers/adminController.js';
import upload from "../middlewares/multer.js";



// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();



// Route to add a new doctor
adminRouter.post('/add-doctor', upload.single('image'), adminAddDoctor);







export default adminRouter;

