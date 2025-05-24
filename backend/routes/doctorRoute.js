import express from 'express';

import { doctorList } from '../controllers/doctorController.js';


const doctorRouter = express.Router()


//route to list all doctors in the frontend 
doctorRouter.get('/list', doctorList)






export default doctorRouter;