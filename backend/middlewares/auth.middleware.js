import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import errorHanlder from "./error.js";
import catchAsyncErrors from "./catch.async.error.js";

export const isUserAuthenticated = catchAsyncErrors(async (req, res, next)=>{

    const accessToken  = req.cookies.accessToken;
    if(!accessToken){
        return next(new errorHanlder("User is unauthenticated", 400));
    }

    const decodeToken = jwt.verify(accessToken, process.env.JWT_SECRETE_KEY);
    if(!decodeToken){
        return next(new errorHanlder("Invalid accessToken", 400)); 
    }

    req.user = await User.findById(decodeToken.id);
    next();

});