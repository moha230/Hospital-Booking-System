import jwt from 'jsonwebtoken';


//create a function that authenticates the user using token

const authUser = async (req, res, next) => {
  // get authorization token
  const authorization = req.headers.authorization;
  //If no token is provided, return an error message
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'User token missing or invalid!' })
  } else {
    const userToken = authorization.split(' ')[1];
    try {

      // verify usertoken
      const decode_Token = jwt.verify(userToken, process.env.JWT_SECRET)

      req.user = decode_Token;
      //go to next middler ware 
      next();

    } catch (error) {
      console.log(error);
     return res.status(401).json({ error: 'JWT token is unauthorized!' });
    }


  }

}


//export the middleware

export default authUser;


