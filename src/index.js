import dotenv from 'dotenv';
dotenv.config();

import connectDB from './database/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import questionRoutes from './routes/questions.js'
import submitRoutes from './routes/submit.js'

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

connectDB();

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes 
app.use('/api/user', userRouter);
app.use('/api/questions', questionRoutes);
app.use('/api/submit', submitRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});