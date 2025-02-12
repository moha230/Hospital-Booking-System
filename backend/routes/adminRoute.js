import express from 'express';
import { addDoctor, loginAdmin } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';

// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();


// This handles POST requests to the endpoint: http://localhost:3000/api/v1/admin/add-doctor
adminRouter.post('/add-doctor', authAdmin, addDoctor);
adminRouter.post('/login', loginAdmin);


export default adminRouter;

