import { Router } from "express";
import multer from "multer";
import {
  createQuestion,
  replyQuestion,
  likeAnswer,
  dislikeAnswer,
  getQuestions,
} from "../services/forumServices.js";

// Multer setup
const upload = multer();

const forumRoutes = Router();

forumRoutes.post("/forum", upload.none(), async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    question: req.body.question,
  };
  const questionId = await createQuestion(formData);
  res.json({
    questionId,
  });
});

forumRoutes.get("/forum", async (req, res) => {
  const question = await getQuestions();
  res.send(question);
});

forumRoutes.put("/forum/reply", upload.none(), async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    answer: req.body.answer,
    id: req.body.id,
  };
  const result = await replyQuestion(formData);
  res.json({
    result,
  });
});

forumRoutes.put("/forum/like", async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    id: req.body.id,
  };
  const result = await likeAnswer(formData);
  res.json({
    result,
  });
});

forumRoutes.put("/forum/dislike", async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    id: req.body.id,
  };
  const result = await dislikeAnswer(formData);
  res.json({
    result,
  });
});

export default forumRoutes;