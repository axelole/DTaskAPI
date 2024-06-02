import db from "../db.js";

const createQuestion = async (data) => {
  const { question } = data;
  const [result] = await db.execute(
    "INSERT INTO forum (question) VALUES (?)",
    [question]
  );
  return result.insertId;
};

const getQuestions = async () => {
  const [rows] = await db.query("SELECT * FROM forum");
  return rows;
};

const replyQuestion = async (data) => {
  const { id, answer } = data;
  const [result] = await db.execute(
    "UPDATE forum SET answer = ? WHERE id = ?",
    [answer, id]
  );
  return result.insertId;
};

const likeAnswer = async (data) => {
  const { id } = data;
  const [rows] = await db.execute("SELECT `like` FROM forum WHERE id = ?", [
    id,
  ]);
  console.log(rows);
  const currentLikes = rows[0].like;
  const newLikes = currentLikes + 1;
  const [result] = await db.execute(
    "UPDATE forum SET `like` = ? WHERE id = ?",
    [newLikes, id]
  );
  return result.affectedRows;
};

const dislikeAnswer = async (data) => {
  const { id } = data;
  const [rows] = await db.execute("SELECT `dislike` FROM forum WHERE id = ?", [
    id,
  ]);
  console.log(rows);
  const currentLikes = rows[0].dislike;
  const newLikes = currentLikes + 1;
  const [result] = await db.execute(
    "UPDATE forum SET `dislike` = ? WHERE id = ?",
    [newLikes, id]
  );
  return result.affectedRows;
};

export {
  createQuestion,
  getQuestions,
  replyQuestion,
  likeAnswer,
  dislikeAnswer,
};