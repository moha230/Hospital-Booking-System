import express from 'express';
import {  addDoctor,} from '../controllers/adminController.js';

import upload from "../middlewares/multer.js";

import authAdmin from '../middlewares/authAdmin.js';

// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();



// Route to add a new doctor
adminRouter.post('/add-doctor', addDoctor,upload.single('image'));







export default adminRouter;

