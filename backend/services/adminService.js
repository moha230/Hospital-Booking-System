import doctorModel from '../models/doctorModel.js';
import bcrypt from "bcrypt";



//function to for service layer 
const addDoctorService = async ({ name, email, password, speciality, degree, experience, about, fees, address }) => {
  try {
   
    // hashing user password
    const salt = await bcrypt.genSalt(5); // the more rounds, the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the data to database
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return { success: true, message: 'Doctor Added' };

  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export { addDoctorService };