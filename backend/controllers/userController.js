
import validator from 'validator';
import bcrypt from "bcrypt";
import { createUser } from "../services/userService.js";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary'

// Controller function to register a new user
const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Email not valid" });
    }

    if (password.length < 16) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await createUser(userData);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User does not exit please try registering' });
    }

    const userMatch = await bcrypt.compare(password, user.password)

    if (userMatch) {
      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, userToken: userToken })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


// controller function to fetch user  profile infromation 

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}


//controller function update user profile 

const updateUserProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" })
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {

      // upload  the image to cloudinary data base 
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: 'User profile updated' })

  } catch (error) {
    console.log(error)
    res.json({ success: true, message: error.message })
  }
}


// Controller function for booking appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select('-password')


    //checking availability 
    if (!docData.available) {
      return res.json({ success: false, message: 'Doctor Not Available' })
    }

    let slots_booked = docData.slots_booked

    // Check if there are already booked slots for a give date 
    if (slots_booked[slotDate]) {
      //If booked return an error response 
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'Slot Not Available' })
      }
      else {
        //If time slot not booked add to the list of booked slots  
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      // If there are no booked slots for that date yet, initialize it as an empty array
      slots_booked[slotDate] = []
      // Add the requested time slot to the new date entry
      slots_booked[slotDate].push(slotTime)
    }

    //Fetch the user document from the database by userId and exclude password from the return data 

    const userData = await userModel.findById(userId).select("-password")

    // Removing the 'slots_booked' field from the doctor data before saving 
    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    // Create  new instance of the appointment model using the appointmentData
    const newAppointment = new appointmentModel(appointmentData)

    // Save the new appointment instance to the MongoDB database
    await newAppointment.save()

    //Save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: 'Appointment Booked' })

  } catch (error) {
    console.error("Appointment Booking Error:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export { userRegistration, loginUser, getUserProfile, updateUserProfile, bookAppointment };
