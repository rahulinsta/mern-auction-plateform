import mongoose from "mongoose";
import { COMMISSION_PAYMENT_STAUTS } from "../constant.js";

const commissionProofShcema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    proof: {
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        }
    },

    amount:Number,
    status:{
        type: String,
        enum: COMMISSION_PAYMENT_STAUTS,
        default: "Pending"
    },
    comment:String

},
{timestamps:true});

export const PaymentProof = mongoose.model("PaymentProof", commissionProofShcema);