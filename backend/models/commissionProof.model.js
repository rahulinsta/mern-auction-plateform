import mongoose from "mongoose";

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

        public_id: {
            type: String,
            required: true
        }
    },

    amount:Number,
    status:{
        type: String,
        enum: ["Pending", "Approved", "Reject", "Settle"],
        default: "Pending"
    },
    comment:String

},
{timestamps:true});

export const PaymentProof = mongoose.model("PaymentProof", commissionProofShcema);