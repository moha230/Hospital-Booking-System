import jwt from 'jsonwebtoken';


//create a function that authenticates the admin using token

const authAdmin = async (req, res, next) => {
  // get authorization token
  const authorization = req.headers.authorization
  //If no token is provided, return an error message
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.json({ success: false, message: 'User token missing or invalid!' })
  } else {
    const AdminToken = authorization.split(' ')[1];

    try {

      // verity token
      const decode_Token = jwt.verify(AdminToken, process.env.JWT_SECRET)

      req.decode_Token= decode_Token;
      

      //callback function

      next();

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message })
    }

  }

}


//export the middleware

export default authAdmin;


