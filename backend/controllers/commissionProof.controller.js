import catchAsyncErrors from "../middlewares/catch.async.error.js";
import errorHanlder from "../middlewares/error.js";
import {User} from "../models/user.model.js";
import { PaymentProof, PaymentProof } from "../models/commissionProof.model.js";
import {v2 as cloudinary} from "cloudinary";

export const proofOfCommission = catchAsyncErrors(async (req, res, next) =>{
    const {proof} = req.files;
    if(!proof || Object.keys(proof).length === 0){
        return next (errorHanlder("Please upload a screenshot of your payment", 400))
    }

    const {amount, comment} = req.body;

    if(!amount || !comment){
        return next (errorHanlder("Amount and Comment are required", 400))
    }

    const user = await User.findById(req.body._id);

    if(user.unpaidCommission === 0 ){

        return res.status(200).json({
            success: true,
            message: "You don't have any pending commission"
        });
    }

    if(user.unpaidCommission <  amount ){

        return next (errorHanlder(`You are sending more payment than you pending commision please send only ${user.unpaidCommission}`, 400))
    }

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];

    if(!allowedImageTypes.includes(proof.mimetype)){
        return next(new errorHanlder(`Screen Shot format is not supported, please upload only in given format ${allowedImageTypes} `, 400));
    }

    const cloudinaryRespose = await cloudinary.uploader.upload(proof.tempFilePath, {
        folder: "MERN_AUCTION_PAYMENTS_PROOF"
    })

    if(!cloudinaryRespose || cloudinaryRespose.error){

        console.error("Error while uplaod screenshot to cloudinary",
            cloudinaryRespose.error
        );

        res.next(new errorHanlder("Fail to upload profile iamge on cloudinary", 500));
    }

    const paymentPoof = PaymentProof.create({
        userId: req.user._id,
        proof:{
            public_id: cloudinaryRespose?.public_id,
            url: cloudinaryRespose?.secure_url,
        },
        amount,
        comment
    });

    return res.status(201).json({
        success: true,
        message: "Payment proof has been submitted successfully, we will review and respond you within 24 hours",
        paymentPoof
    })


    

});