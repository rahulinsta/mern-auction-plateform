class errorHanlder extends Error{
     constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

     }
}

export const errorMiddleware = (err, req, res, next) =>{
    err.message = err.message || "Internal server error.";
    err.statusCode = err.statusCode || 500 ;

    if(err.name === "JsonWebTokenError"){
        const message = "Invalid json web token, please try again";
        err = new errorHanlder(message, 400);
    }

    if(err.name === "JsonWebTokenExpired"){
        const message = "Json web token expired, please try again";
        err = new errorHanlder(message, 400);
    }

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`;
        err = new errorHanlder(message, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors)
    .map(error => error.message)
    .join(" ") : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    })
}

export default errorHanlder;