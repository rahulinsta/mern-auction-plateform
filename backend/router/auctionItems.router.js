import express from "express";
import { createAuctionItem } from "../controllers/auctionItem.controller.js";
import { isAuthorized, isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isUserAuthenticated,isAuthorized("Auctioneer") ,createAuctionItem);

export default router;
