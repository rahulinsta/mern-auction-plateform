import errorHanlder from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
export const register = async (req, res, next) =>{

    if(!req.files || Object.keys(req.files).length === 0){
        return next(new errorHanlder("User profile image is required", 400))
    }

    const {profileImage} = req.files;
    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];

    if(!allowedImageTypes.includes(profileImage.mimetype)){
        return next(new errorHanlder(`Image type in not supported, please upload only in given format ${allowedImageTypes} `, 400));
    }

    const {username, password, email, address, phone, bankAccountNumber,
        bankAccountName, bankName, phonePayMobileNumber, payPalEmail, role 
    } = req.body;

    if(!username || !password || !email || !address || !phone || !role){
        return next(errorHanlder("Please provide all the details", 400));
    }

    if( role === "Auctioneer" ){

        if(!bankAccountName || !bankAccountNumber || !bankName){
            return next(new errorHanlder("Please provide all bank details", 400));
        }

        if(!phonePayMobileNumber){
            return next(new errorHanlder("Please provide your phonepay mobile number", 400));
        }

        if(!payPalEmail){
            return next(new errorHanlder("Please provide your paypal email", 400));
        }
    }

    const checkExistingUser = await User.find({email});
    if(checkExistingUser){
        return next(new errorHanlder("User already registered", 400));
    }

    const cloudinaryRespose = await cloudinary.uploader.upload(profileImage, {
        folder: "MERN_AUCTION_PLATEFORM_USERS"
    })

    if(!cloudinaryRespose || cloudinaryRespose.error){

        console.error("Error while uplaod image to cloudinary",
            cloudinaryRespose.error
        );

        res.next(new errorHanlder("Fail to upload profile iamge on cloudinary", 500));
    }



};