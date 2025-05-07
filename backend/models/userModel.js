import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: defaultUserImage },
  phone: { type: String, default: '+3580000000' },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  gender: { type: String, default: 'Not Selected' },
  dob: { type: Date, default: null },
  
})

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;