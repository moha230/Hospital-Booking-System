import express from 'express';
import { addDoctor, loginAdmin ,allDoctors} from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';

// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();


// This handles POST requests to the endpoint: http://localhost:3000/api/v1/admin/add-doctor
// Route to login the admin
adminRouter.post('/login', loginAdmin);

// Route to add a new doctor
adminRouter.post('/add-doctor', authAdmin, addDoctor);

//Route to get all doctor 

adminRouter.get("/all-doctors", authAdmin, allDoctors)





export default adminRouter;

