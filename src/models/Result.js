import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selected: String,
      correct: Boolean,
    },
  ]
});

export default mongoose.model('Result', resultSchema);
