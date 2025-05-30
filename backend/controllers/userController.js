
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

    // Basic validation
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const doctor = await doctorModel.findById(docId).select("-password");

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    if (!doctor.available) {
      return res.status(403).json({ success: false, message: 'Doctor not available' });
    }

    // Check slot availability
    const slotsBooked = doctor.slots_booked || {};

    if (!slotsBooked[slotDate]) {
      slotsBooked[slotDate] = [];
    }

    if (slotsBooked[slotDate].includes(slotTime)) {
      return res.status(409).json({ success: false, message: 'Slot already booked' });
    }

    // Update slot booking locally before saving
    slotsBooked[slotDate].push(slotTime);

    const user = await userModel.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const appointment = new appointmentModel({
      userId,
      docId,
      userData: user,
      docData: {
        _id: doctor._id,
        name: doctor.name,
        speciality: doctor.speciality,
        fees: doctor.fees
      },
      amount: doctor.fees,
      slotTime,
      slotDate,
      date: new Date()
    });

    await appointment.save();

    // Save updated slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    return res.status(201).json({ success: true, message: 'Appointment booked successfully' });

  } catch (error) {
    console.error("Appointment Booking Error:", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export { userRegistration, loginUser, getUserProfile, updateUserProfile, bookAppointment };
