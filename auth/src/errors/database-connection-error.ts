import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = "Error connecting to database";

    constructor(  ){
        super("Database Error Occured");

        Object.setPrototypeOf( this, DatabaseConnectionError.prototype );
    }

    serializeError() {
        return [{ message: this.reason }]
    }
}