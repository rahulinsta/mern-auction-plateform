import  express  from "express";
import { placeBid } from "../controllers/bid.controller.js";
import { isAuthorized, isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/placebid/:id",isUserAuthenticated, isAuthorized("Bidder"), placeBid)

export default router;