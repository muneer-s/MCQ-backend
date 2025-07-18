import express from 'express';
import { submitAnswers, submitFeedback } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/',protect, submitAnswers);
router.post('/submit-feedback',protect, submitFeedback);


export default router;
