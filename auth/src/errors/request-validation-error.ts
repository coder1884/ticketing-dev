import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError{
    statusCode = 400;

    constructor( public errors : ValidationError[] ){
        super("Invalid Request Paramters");

        // Only because we are extending a build in class
        // If this is not added then this will point to Error not RequestValidationError
        // Without this fix, instanceof RequestValidationError checks might fail.
         Object.setPrototypeOf( this, RequestValidationError.prototype );
    }

    serializeError() {
          const formattedErrors = this.errors.filter( (e) => e.type === 'field'  ).map( e => {
            return { message: e.msg , field: e.path  };
        } );

        return formattedErrors;
    }
}