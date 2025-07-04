import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

export const errorHandler = ( 
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction 
 ) => {
    console.log("Something went wrong"); 

    if( err instanceof CustomError ){
        return res.status(err.statusCode).send({
            errors : err.serializeError()
        });
    }

    res.status(400).send({
        errors : [{ message :  "Something Went Wrong" }]
    });
}