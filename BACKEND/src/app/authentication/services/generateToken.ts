import jwt from 'jsonwebtoken';

export const generateToken = (obj:object)=>{
    const token = jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1d'});
    return token;
}



//@desc GET USER PROFILE 
//@route GET /user/profile
//@access Public