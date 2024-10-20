import express from "express";
import { createAuctionItem } from "../controllers/auctionItem.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", isUserAuthenticated,createAuctionItem);

export default router;
