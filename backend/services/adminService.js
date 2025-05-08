import doctorModel from "../models/doctorModel.js";


const createDoctor = async (doctorData) => {
  try {
    const newDoctor = new doctorModel(doctorData);
    const savedDoctor = await newDoctor.save();
    return { success: true, data: savedDoctor };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return { success: false, message: "Doctor with this email already exists." };
    }
    return { success: false, message: "Failed to save doctor." };
  }
};


export {createDoctor}