import express from 'express';

import { doctorList,loginDoctor} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';


const doctorRouter = express.Router()


//route to list all doctors in the frontend 
doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor);




export default doctorRouter;