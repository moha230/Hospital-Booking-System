import doctorModel from "../models/doctorModel.js";

// controller function to change the availability of the doctors need both admin and doctors panel 

const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorModel.findById(doctorId);
    await doctorModel.findByIdAndUpdate(doctorId, { available: !doctor.available });
    res.json({ success: true, message: 'Availability Changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//controller function to fetch doctors data and present them as list frontend
const doctorList = async (req,res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


export { changeAvailability,doctorList }