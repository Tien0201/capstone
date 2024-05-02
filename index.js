import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { logger, logEvents } from './middleware/logger.js'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import imgRoutes from './routes/imageRoutes.js'


const app = express();
const port = 3500;
dotenv.config();
//midleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use('/auth',authRoutes)
app.use('/img',imgRoutes)


app.listen(port , () =>{
    console.log(`Server running at http://localhost:${port}/`);
});