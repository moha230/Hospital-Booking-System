import jwt from 'jsonwebtoken';


//create a function that authenticates the admin using token

const authAdmin = async (req, res, next) => {
  // get authorization token
  const authorization = req.headers.authorization;
  //If no token is provided, return an error message
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401).json({ error: 'User token missing or invalid!' })
  } else {
    const adminToken = authorization.split(' ')[1];
    try {

      // verify token
      const decode_Token = jwt.verify(adminToken, process.env.JWT_SECRET)

      req.decode_Token = decode_Token;
      //go to next middler ware 

      next();

    } catch (error) {
      console.log(error);
      res.json({ error: 'JWT token is unauthorized!' })
    }

  }

}


//export the middleware

export default authAdmin;


