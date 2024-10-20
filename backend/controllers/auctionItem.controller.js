import {User} from "../models/user.model.js"
import { Auction } from "../models/auction.model.js"
import catchAsyncErrors from "../middlewares/catch.async.error.js"
import errorHanlder from "../middlewares/error.js"
import { v2 as cloudinary } from "cloudinary";

export const createAuctionItem = catchAsyncErrors( async (req, res, next)=>{

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new errorHanlder("Auction image is required", 400))
    }

    const {image} = req.files;

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];

    if(!allowedImageTypes.includes(image.mimetype)){
        return next(new errorHanlder(`Image type in not supported, please upload only in given format ${allowedImageTypes} `, 400));
    }

    const {
        title,
        description,
        startingBid,
        category,
        condition,
        startTime,
        endTime,

    } = req.body;

    if( !title || !description || !startingBid || !category || !condition || !startTime || !endTime){
        return next(new errorHanlder("Please provide all the details", 400));
    }

    if(new Date(startTime) < Date.now()){
        return next(new errorHanlder("Please provide a valid start time from future", 400));
    }
    if(startTime >= endTime){
        return next(new errorHanlder("Auction end time must be greater than start time", 400));
    }

    const activeAuction = await Auction.find({
        createdBy: req.user._id,
        endTime: {$gt: Date.now()}
    })
   
    if(activeAuction.length > 0){
        return next(new errorHanlder("You already have an active auction", 400));
    }


    try {

        const cloudinaryRespose = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "MERN_AUCTION_PLATEFORM_AUCTIONS"
        })
    
        if(!cloudinaryRespose || cloudinaryRespose.error){
    
            console.error("Error while uplaod image to cloudinary",
                cloudinaryRespose.error
            );
    
            res.next(new errorHanlder("Fail to upload auction iamge on cloudinary", 500));
        }
        
        const auctinItem = await Auction.create({
            title,
            description,
            startingBid,
            category,
            condition,
            startTime,
            endTime,
            image:{
                public_id: cloudinaryRespose?.public_id,
                url: cloudinaryRespose?.secure_url,
            },
            createdBy:req.user._id           
        })

        return res.status(201).json({
            success: true,
            data: auctinItem,
            message: `Your action has been created successfully and will be listed on website at ${startTime}`
        })

    } catch (error) {
        return res.next(new errorHanlder(error.message || "Something went wrong while creating actions", 500))
    }


})