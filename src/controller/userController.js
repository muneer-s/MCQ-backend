import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import Feedback from "../models/Feedback.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const userSignup = async (req, res) => {
  try {
    const { fullName, email, mobile, role, password } = req.body;
    console.log(11, fullName, email, mobile, role, password);

    if (!fullName || !email || !mobile || !role || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        mobile: newUser.mobile,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password)
      return res
        .status(400)
        .json({ message: "mobile and password are required" });
    const user = await User.findOne({ mobile });

    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const submitAnswers = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    console.log("user submitted the answers....");

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

    console.log(12, result);

    await result.save();
    res.json({ score });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().limit(10);
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { testId, emoji, comment } = req.body;

    const feedback = new Feedback({
      testId,
      emoji,
      comment,
    });

    await feedback.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
