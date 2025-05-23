
import validator from 'validator';
import bcrypt from "bcrypt";
import { createUser } from "../services/userService.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
      res.json({ success: false, message: 'User does not exit please try registering' });
    }

    const userMatch = await bcrypt.compare(password, user.password)

    if (userMatch) {
      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token:userToken })
    } else
    {
      res.json({ success: false, message:"Invalid credentials" })
    }
  

  } catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: error.message });
}
}

export { userRegistration , loginUser};
