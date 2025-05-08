import doctorModel from "../models/doctorModel.js";


/** Save a new doctor to the database */
const createDoctor = (doctorData) => {
  const newDoctor = new doctorModel(doctorData);
  return newDoctor.save();
}





export {createDoctor}