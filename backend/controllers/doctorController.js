import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from "../models/appointmentModel.js";

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

const doctorDashboard = async (req, res) => {
  try {

    const doctorId = req.doctor.id;


    const appointments = await appointmentModel.find({ docId: doctorId });


    let earnings = 0;
    const uniquePatients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
      uniquePatients.add(item.userId.toString());
    });

    const dashboard = {
      earnings,
      appointments: appointments.length,
      patients: uniquePatients.size,
      latestAppointments: [...appointments].reverse(),
    };

    res.json({ success: true, dashboard });
  } catch (error) {
    console.error("Doctor Dashboard Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctor?.id;

    if (!docId) {
      return res.status(401).json({ success: false, message: "Doctor ID not found in request" });
    }

    const profileData = await doctorModel.findById(docId).select("-password");


    if (!profileData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};





export { changeAvailability, doctorList, loginDoctor, doctorDashboard, doctorProfile}