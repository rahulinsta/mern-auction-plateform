import express from "express";
import { createAuctionItem, getAllItems, getAuctionDetails, getMyAuctionIems, removeAuctionItem, replublishItem } from "../controllers/auctionItem.controller.js";
import { isAuthorized, isUserAuthenticated } from "../middlewares/auth.middleware.js";
import { trackUnpaidCommission } from "../middlewares/trackUnpaidCommission.middleware.js";

const router = express.Router();

router.post("/create", isUserAuthenticated,trackUnpaidCommission,isAuthorized("Auctioneer") ,createAuctionItem);
router.get("/items", getAllItems);
router.get("/item/:id",isUserAuthenticated, getAuctionDetails);
router.get("/my-items",isUserAuthenticated, isAuthorized("Auctioneer"), getMyAuctionIems);
router.delete("/delete/:id", isUserAuthenticated, isAuthorized("Auctioneer"),removeAuctionItem);
router.put("/republish/:id", isUserAuthenticated, isAuthorized("Auctioneer"), replublishItem );

export default router;
