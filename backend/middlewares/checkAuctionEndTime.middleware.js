import mongoose from "mongoose";
import catchAsyncErrors from "./catch.async.error.js";
import errorHanlder from "./error.js";
import { Auction } from "../models/auction.model.js";


export const checkAuctionEndTime = catchAsyncErrors( async (req, res, next) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next (new errorHanlder("Invalid ID format", 400));
    }

    const auction = await Auction.findById(id);

    if(!auction){
        return next (new errorHanlder("Auction not found", 404));
    }

    const now = new Date();

    if( new Date(auction.startTime) > now){
        return next (new errorHanlder("Auction is not started yet", 400));
    }

    if(new Date (auction.endTime) <  now){
        return next (new errorHanlder("Auction is ended", 400));
    }

    next();

})