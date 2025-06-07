import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { ConnectDb} from './db/ConnectDb.js';
import connectCloudinary from './utils/cloudinary.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

connectCloudinary()

// Routes
import authRoute from './routes/auth.route.js'
import blogRoute from './routes/blog.route.js';
import commentRoute from './routes/comment.route.js';



app.use('/api/v1/' , authRoute)
app.use('/api/v1/' , blogRoute)
app.use('/api/v1/' , commentRoute)



app.listen(PORT , ()=>{
  ConnectDb();
  console.log('server listening on port : '+PORT);
})