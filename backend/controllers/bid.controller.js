import catchAsyncErrors from "../middlewares/catch.async.error.js";
import errorHanlder from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Auction } from "../models/auction.model.js";
import { Bid } from "../models/bid.model.js";

export const placeBid = catchAsyncErrors( async(req, res, next)=>{

    const {id} = req.params;
    
    const auctionItem = await Auction.findById(id);

    if(!auctionItem){
        return next(new errorHanlder("Auction not found", 404));
    }

    const {amount} = req.body;
    
    if(!amount){
        return next(new errorHanlder("Please place your bid", 400));      
    }
    
    if(amount <= auctionItem.currentBid){
        return next(new errorHanlder("Bid must be greater than current bid", 400));            
    }

    if(amount <= auctionItem.startingBid){
        return next(new errorHanlder("Bid must be greater than starting bid", 400));            
    }

    try {
        
        const existingBid = await Bid.findOne({
            "bidder.id": req.user._id,
            auctionItem: auctionItem._id
        });

        const existingBidInAuction =  auctionItem.bids.find(bid => bid.userId.toString() == req.user._id.toString());

        if(existingBid && existingBidInAuction){
            existingBid.amount = amount;
            existingBidInAuction.amount = amount
            await existingBid.save();
            await existingBidInAuction.save();
            auctionItem.currentBid = amount;
        }else{
            const bidderDetails = await User.findById(req.user._id);
            
            const bid = await Bid.create({
                amount,
                bidder: {
                    id: bidderDetails._id,
                    username: bidderDetails.username,
                    profileImage: bidderDetails.profileImage?.url
                },
                auctionItem: auctionItem._id
            });

            auctionItem.bids.push({
                userId: bidderDetails._id,
                userName: bidderDetails.username,
                profileImage: bidderDetails.profileImage?.url,
                amount
            });

            await auctionItem.save();

            return res.status(201).json({
                success: true,
                data: {currentbid: auctionItem.currentBid}
            });
        }


    } catch (error) {
        
        return next(new errorHanlder(error.message || "Error while placing the bid", 500))
    }



})