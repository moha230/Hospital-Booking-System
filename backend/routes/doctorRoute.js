import express from 'express';

import { doctorDashboard, doctorList,loginDoctor,doctorProfile,} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';



const doctorRouter = express.Router()


//route to list all doctors in the frontend 
doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor);

doctorRouter.get('/dashboard', authDoctor, doctorDashboard );

doctorRouter.get("/profile", authDoctor, doctorProfile)




export default doctorRouter;