import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/user.router.js"
import auctionItemRouter from "./router/auctionItems.router.js"

config({
    path: "./config/config.env"
})

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/"
}));

//router configuration 

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);




connection()

app.use(errorMiddleware)

export {app}