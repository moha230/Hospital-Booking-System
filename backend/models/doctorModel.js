import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: Number, required: true },
  available: { type: Boolean, default: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  date: { type: Number, default: Date.now },
  slots_booked: { type: Object, default: {} }
}, { minimize: false });

const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorsSchema);
export default DoctorModel;
