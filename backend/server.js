import {app} from "./app.js"
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

app.listen(3000, ()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
});