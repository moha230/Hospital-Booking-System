import express from 'express';
import { adminRegisterDoctor,loginAdmin,adminListDoctors, adminlistAppointments, adminCancelAppointment } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
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

//route to change the availability of doctors in admin panel
adminRouter.post('/change-availability',authAdmin,changeAvailability)

//route to list all appointments
adminRouter.get("/list-appointments", authAdmin, adminlistAppointments)

//route to cancel admin to cancel appointments
adminRouter.post("/cancel-appointment", authAdmin, adminCancelAppointment)









export default adminRouter;

