import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  emoji: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Feedback', feedbackSchema);
