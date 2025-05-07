


// function for adding doctors to the database 
const addDoctor = async (req,res) => {
  try {

    // get data from the request body 
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body

    //image file that would be parsed 
    const imageFile = req.imageFile

    console.log()
  } catch (error) {
    
  }
}


export {addDoctor}