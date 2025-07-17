import express from 'express';
import { userSignup, userLogin } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', userSignup);
userRouter.post('/login', userLogin);

export default userRouter;
