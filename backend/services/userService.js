import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createUser = async (userData) => {
  try {
    const newUser = new userModel(userData);
    const savedUser = await newUser.save();
    const userToken = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET)

    return { success:true,token: userToken };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return { success: false, message: "User with this email already exists." };
    }
    return { success: false, message: "Failed to save user." };
  }
};


export { createUser }