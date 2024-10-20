import express from "express";
import { getLeaderBoard, getProfile, login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', getProfile );
router.get('/get-leader-board', getLeaderBoard);


export default router;