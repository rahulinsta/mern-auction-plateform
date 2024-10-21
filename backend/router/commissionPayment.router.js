import express from "express";
import { proofOfCommission } from "../controllers/commissionProof.controller.js";
import { isAuthorized, isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/proof",isUserAuthenticated, isAuthorized("Auctioneer"), proofOfCommission)


export default router;