import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from '../models/doctorModel.js';

// function to add doctor in the database
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

    
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(201).json({ success: false, message: "Missing Details!" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(5); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt)

    //save the data to database 

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
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export { addDoctor };