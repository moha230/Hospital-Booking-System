

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    
    res.status(200).json({
      success: true,
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default loginDoctor;


// controller function to change the availability of the doctors need both admin and doctors panel 

const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { available: !doctor.available },
      { new: true } 
    );
    res.json({
      success: true,
      message: `Availability changed to ${updatedDoctor.available ? 'Available' : 'Unavailable'}`,
      doctor: updatedDoctor
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//controller function to fetch doctors data and present them in the  frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}




export { changeAvailability, doctorList,loginDoctor }