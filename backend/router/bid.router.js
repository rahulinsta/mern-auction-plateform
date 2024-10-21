import  express  from "express";
import { placeBid } from "../controllers/bid.controller.js";
import { isAuthorized, isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { checkAuctionEndTime } from "../middlewares/checkAuctionEndTime.middleware.js";

const router = express.Router();

router.post(
    "/placebid/:id",
    isUserAuthenticated,
    isAuthorized("Bidder"),
    checkAuctionEndTime,
    placeBid
)

export default router;