import mongoose, {Schema} from "mongoose";
import { AUCTION_CATEGORY } from "../constant.js";

const auctionSchema = new Schema({
    title: String,
    description: String,
    startingBid: Number,
    category:String,
    condition:{
        type: String,
        enum: AUCTION_CATEGORY
    },
    currentBid:{
        type: Number,
        default:0
    },
    startTime: String,
    endTime: String,
    image:{
        public_id: {
            type: String,
            reqired: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bids:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bid",
                required: true
            },
            userName: String,
            profileImage: String,
            amount: Number

        }
    ],

    highestBidder:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commissionCalculated: {
        type: Boolean,
        default: false
    }

},
    
{timestamps: true}
); 

export const Auction = mongoose.model("Auction", auctionSchema);