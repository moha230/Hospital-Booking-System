// import { addUserService } from '../services/adminService.js'; // Import the service
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

// function to add user in the database
const addUser = async (req, res) => {
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

    const userData = {
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

    const newUser = new doctorModel(userData)
    await newUser.save()
    res.json({ success: true, message: 'User Added' })

    //  // Call the service function to handle user creation
    //  const response = await addUserService({ name, email, password, speciality, degree, experience, about, fees, address });

    //  res.json(response);  // Send the response from the service


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get all a user's details


const allUsers = async (req,res) => {
  try {

      const users = await userModel.find({}).select('-password')
      res.json({ success: true, users })

  } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
  }
}







export { addUser ,loginAdmin,allUsers};