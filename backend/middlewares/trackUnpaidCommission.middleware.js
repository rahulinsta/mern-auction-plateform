import catchAsyncErrors from "./catch.async.error.js";
import errorHanlder from "./error.js";
import { User } from "../models/user.model.js";

export const  trackUnpaidCommission = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.user._id);
    if(user.unpaidCommission > 0){
        return next(new errorHanlder("You have unpaid commissions, please pay them before posting a new auction", 403))
    }
    next();
})