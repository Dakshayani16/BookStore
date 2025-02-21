import express, { request, response } from 'express';
import {Book} from "./models/bookModel.js"
import { PORT,mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: ['http://localhost:5173', 'https://bookstorefirst.netlify.app','https://beautiful-swan-687929.netlify.app'], // Add your Netlify frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

  app.use(express.json());
// middleware for parsing request body
app.use(express.json());
app.get('/',(request,response) =>{
    console.log(request)
    return response.status(234).send("Welcome to  Book store Project")
});
app.use('/books',booksRoute);

// CORS (Cross-Origin Resource Sharing) is a security feature in web browsers 
// that controls how resources on a web page can be requested from 
// a different origin (domain, protocol, or port). It prevents 
// unauthorized cross-origin requests but allows controlled access 
// through HTTP headers

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins

mongoose
.connect(mongoDBURL)  // 1️⃣ Connect to MongoDB using the provided URL
.then(() => {         // 2️⃣ If the connection is successful, execute this block
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT,() =>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {   // 3️⃣ If the connection fails, handle the error
    console.error("Error connecting to MongoDB:", error);
});