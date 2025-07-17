import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// GET: all questions (limit 10)
router.get('/', async (req, res) => {
    console.log(1111);
    
  const questions = await Question.find().limit(10)
  console.log(1122,questions);
  
  res.json(questions);
});

export default router;
