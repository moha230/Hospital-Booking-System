import mongoose from "mongoose";



//function to connect to mangoDB database 
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected to application"))
        await mongoose.connect(`${process.env.MONGODB_URI}/unix-doctors`)
        

    } catch (error) {
      console.log(error)
    }


}

export default connectDB;