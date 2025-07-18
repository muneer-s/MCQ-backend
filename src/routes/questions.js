import express from "express";
import { getAllQuestions } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getAllQuestions);

export default router;
