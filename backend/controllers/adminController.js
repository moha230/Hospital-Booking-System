
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { createDoctor } from "../services/adminService.js";
import { validateDoctorInput } from '../utils/validateDoctorData.js';

// controller function to addDoctors to the database  
const adminAddDoctor = async (req, res) => {
  try {





    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    //validate input 
    const validation = validateDoctorInput({ name, email, password, speciality, degree, experience, about, fees, address })
    if (!validation.success) {
      return res.json({ success: false, message: validation.message })
    }



    // hash the user password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary database 
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url
    console.log("Cloudinary secure_url:", imageUpload.secure_url);

    //service add all the infromation to database 
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


    //function to create doctors in the data base 
    await createDoctor(doctorData);
    res.status(201).json({ message: 'Doctor added successfully.' });

  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Server error.' });
  }
}


export { adminAddDoctor };
