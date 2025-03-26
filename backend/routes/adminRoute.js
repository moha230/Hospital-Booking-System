import express from 'express';
import { addUser, loginAdmin ,allUsers} from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';

// Create a new router instance for handling admin-related routes
const adminRouter = express.Router();


// This handles POST requests to the endpoint: http://localhost:3000/api/v1/admin/add-user
// Route to login the admin
adminRouter.post('/login', loginAdmin);

// Route to add a new user
adminRouter.post('/add-user', authAdmin, addUser);

//Route to get all user 

adminRouter.get("/all-users", authAdmin, allUsers)





export default adminRouter;

