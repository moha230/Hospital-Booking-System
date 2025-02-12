// import { addDoctorService } from '../services/adminService.js'; // Import the service
import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from '../models/doctorModel.js';
//importing jwt 
import jwt from 'jsonwebtoken';



// function that allows the admin to log in 

const loginAdmin = async (req, res) => {
  try {

    const {email,password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      //store the web token in the variable called with JWT secret token 
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      //console.log(token);
      //send a response back json format 
      res.json({success:true,token})
    }
    else {
      res.json({ success: false, message: "Invalid credentials please try again" })
    }

  } catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// function to add doctor in the database
const addDoctor = async (req, res) => {
  try {


    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    console.log(req.body)



    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(201).json({ success: false, message: "Missing Details!" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password that has more than 8 characters " })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(5); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt)

    //save the data to database this has to have its own file called adminService 

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

    //  // Call the service function to handle doctor creation
    //  const response = await addDoctorService({ name, email, password, speciality, degree, experience, about, fees, address });

    //  res.json(response);  // Send the response from the service


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export { addDoctor ,loginAdmin};