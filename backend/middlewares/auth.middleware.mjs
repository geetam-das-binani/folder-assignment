import {ErrorHandler} from '../utils/error.mjs'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.mjs'
export const isAuthenticatedUser = async (req, res, next) => {
 
    const { ftoken } = req.cookies;
   
    if (!ftoken) {
    return  next(new ErrorHandler("Please Login to continue", 401));
    }
    const decodedData = jwt.verify(ftoken, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    
    next();
 
};

