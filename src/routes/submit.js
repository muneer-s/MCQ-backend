import express from 'express';
import Result from '../models/Result.js';
import Question from '../models/Question.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  console.log(999999);
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { answers, feedback } = req.body;

  let score = 0;
  const detailedAnswers = [];

  for (const answer of answers) {
    const question = await Question.findById(answer.questionId);
    const isCorrect = question.correctAnswer === answer.selected;
    if (isCorrect) score += 5;

    detailedAnswers.push({
      questionId: question._id,
      selected: answer.selected,
      correct: isCorrect,
    });
  }

  const result = new Result({
    userId: decoded.id,
    score,
    answers: detailedAnswers,
    feedback,
  });

  console.log(12,result);
  

  await result.save();
  res.json({ score });
});

export default router;
