import express from "express";
import { getLeaderBoard, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile',isUserAuthenticated, getProfile );
router.get('/get-leader-board', getLeaderBoard);


export default router;