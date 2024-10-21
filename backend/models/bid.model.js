import mongoose, {Schema} from "mongoose";

const bidSchema = new Schema({
    amount: Number,
    bidder: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: String,
        profileImage: String
    },
    auctionItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
        required: true
    }
},
{timestamps: true});

export const Bid = mongoose.model("Bid", bidSchema);
