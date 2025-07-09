import mongoose, { Model, Schema } from "mongoose";
import { Password } from "../services/password";

type UserDoc = {
    email : string, 
    password : string 
}

// Instance Methods
interface UserMethods { 
 
}

// Query Helpers 
interface UserQueryHelpers {
//   byEmail(email: string): QueryWithHelpers<
//     HydratedDocument<User, UserMethods>[],  //  result type 
//     HydratedDocument<User, UserMethods>,    // document shape
//     UserQueryHelpers                        // attach so that more query helpers can be called on the query helper
//   >;
}

// Static Methods
interface UserModel extends Model <UserDoc, { /* UserQueryHelpers */ }, UserMethods>{ 
   
} 

// We need to pass the UserMethods, QueryHelpers to the Schema type definition do that 
// other wise we will not have type definition inside of schema methods 
// basically we are telling the this variable what is available  
const userSchema = new Schema<UserDoc, UserModel, UserMethods  /*, UserQueryHelpers */ >({  
    email : {
        type : String, 
        required : true,  
    }, 
    password : { 
        type : String,  
        required : true  
    }  
});

userSchema.pre( 'save', async function() {
    if( this.isModified('password') ){
        const hashed = await Password.toHash(this.password);
        this.password = hashed;
    }
} );

const User = mongoose.model<UserDoc, UserModel >('User', userSchema); 

 
export { User };
