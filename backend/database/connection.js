import mongoose from "mongoose";

const connection = () =>{

    mongoose.connect(process.env.MONGODB_URI,{
        dbName: "MERN_AUCTION_PROJECT"
    })
    .then(()=>{
        console.log(`Database connected successfully`);
    })
    .catch(err=>{
        console.log(`Something went wrong while connecting to Database ${err}`);
    })
} 

export {connection}