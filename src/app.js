// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './database/mongoDB.js';
import userRouter from './routes/userRoutes.js';
import questionRoutes from './routes/questions.js';
import submitRoutes from './routes/submit.js';

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/questions', questionRoutes);
app.use('/api/submit', submitRoutes);

export default app;
