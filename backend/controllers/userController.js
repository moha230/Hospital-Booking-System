
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
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please register.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Generate JWT
    const userToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      userToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// controller function to fetch user  profile infromation 

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id
    console.log("User ID from req.user:", userId);


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
    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;

    const docDoc = await doctorModel.findById(docId).select("-password");
    if (!docDoc || !docDoc.available) {
      return res.status(404).json({ success: false, message: "Doctor not available" });
    }

    const slots_booked = docDoc.slots_booked || {};

    // Check slot
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot Not Available" });
    }

    // Mark as booked
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    const userDoc = await userModel.findById(userId).select("-password");
    if (!userDoc) return res.status(404).json({ success: false, message: "User not found" });

    const appointmentData = {
      userId,
      docId,
      userData: userDoc.toObject(),
      docData: (() => {
        const cleanDoc = docDoc.toObject();
        delete cleanDoc.slots_booked;
        return cleanDoc;
      })(),
      amount: docDoc.fees,
      slotTime,
      slotDate,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor slot data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });

  } catch (error) {
    console.error("bookAppointment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//controler function to fetch user appointments form the database 
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId)
    const appointments = await appointmentModel.find({ userId })

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



export { userRegistration, loginUser, getUserProfile, updateUserProfile, bookAppointment, listAppointment };
