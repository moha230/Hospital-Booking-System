import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { createDoctor } from "../services/adminService.js";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js"



//controller function for admin login 

const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

// controller function to adminRegisterDoctor to the database  
const adminRegisterDoctor = async (req, res) => {
  try {


    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    //validate input 
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" })
    }
    // Validat that  email format is correct
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Email not valid" });
    }
    //Validat the password format is correct 

    if (password.length < 16) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }


    // Hash the admin password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Upload image to cloudinary database 
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url


    //Service add all the infromation to database 
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    }



    // Function to register / create doctors in the database
    const result = await createDoctor(doctorData);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.status(201).json({ success: true, message: 'Doctor added successfully.' });
    ;

  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// controller function to cancel admin appointments
const adminCancelAppointment = async (req, res) => {
  try {

      const { appointmentId } = req.body
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

      res.json({ success: true, message: 'Appointment Cancelled' })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }

}


// function controller to list all doctors 

const adminListDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.status(200).json({ success: true,doctors });

  } catch (error) {
    console.log('Error listing doctors', error)
    res.status(500).json({ message: 'Internal server error' });
  }
}

//controller function to list all appointments 
const adminlistAppointments = async (req, res) => {
  try {

      const appointments = await appointmentModel.find({})
      res.json({ success: true, appointments })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }

}



// controller function to get doctors and appointment data to admin panel 

const adminDashboard = async (req, res) => {
  try {
    
    const [doctors, users, appointments] = await Promise.all([
      doctorModel.find({}),
      userModel.find({}),
      appointmentModel.find({})
    ]);

    // Prepare response data
    const dashboardData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.slice(-5).reverse()  
    };

    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error("Admin Dashboard Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};





export { adminRegisterDoctor, loginAdmin, adminListDoctors,adminlistAppointments,adminCancelAppointment,adminDashboard };
