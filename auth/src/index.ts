import express from 'express'; 
import { json } from 'body-parser';  
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
 
import { currentUserRouter } from './routes/current_user'; 
import { signOutRouter } from './routes/signout'; 
import { signInRouter } from './routes/signin'; 
import { signUpRouter } from './routes/signup'; 
import { errorHandler } from './middlewares/error_handler'; 
import { NotFoundError } from './errors/not-found-error'; 

const app = express(); 
app.use( json() );

app.use( currentUserRouter ); 
app.use( signOutRouter ); 
app.use( signInRouter ); 
app.use( signUpRouter ); 


 app.use( (req , res, next)=> {
      throw new NotFoundError();
 } )

app.use( errorHandler as ErrorRequestHandler ); 

const PORT = 3000; 
 
const start = async() => {
   console.log("In here")
   try{
      await mongoose.connect( 'mongodb://auth-mongo-srv:27017/auth' );
      console.log("Connected to Mongodb");
   }catch(err){
      console.error(err);
   }  

   app.listen( PORT, () => {  
    console.log("Listening on port 3000 - !!!");  
 } );  

}

start();

 