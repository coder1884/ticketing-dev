import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError{
    statusCode =  404;

    constructor(){
        super("Route Not Found");

        Object.setPrototypeOf( this, NotFoundError.prototype );
    }

    serializeError(): { message: string; field?: string; }[] {
        return [{
            message : "Not Found"
        }]
    }
}