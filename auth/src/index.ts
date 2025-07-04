import express from 'express'; 
import { json } from 'body-parser';  
 
import { currentUserRouter } from './routes/current_user';
import { signOutRouter } from './routes/signout';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';

const app = express(); 
app.use( json() );

app.use( currentUserRouter );
app.use( signOutRouter );
app.use( signInRouter );
app.use( signUpRouter );

const PORT = 3000; 

 app.listen( PORT, () => { 
    console.log("Listening on port 3000 - !!!"); 
 } ); 

 