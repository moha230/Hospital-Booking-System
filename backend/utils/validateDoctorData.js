// utils/validateDoctorInput.js
import validator from "validator";

const validateDoctorInput = (data) => {
  const requiredFields = [
    "name",
    "email",
    "password",
    "speciality",
    "degree",
    "experience",
    "about",
    "fees",
    "address",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return { success: false, message: `${field} is required` };
    }
  }
// Validat that  email format is correct
  if (!validator.isEmail(data.email)) {
    return { success: false, message: "Email not valid" };
  }
 //validat the password format is correct 
  if (data.password.length < 16) {
    return { success: false, message: "Please enter a strong password" };
  }

  return { success: true };
}


export {validateDoctorInput }