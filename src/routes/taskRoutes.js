const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeAllTasks,
  deleteCompletedTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.post("/tasks/complete-all", completeAllTasks);
router.delete("/tasks/completed", deleteCompletedTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
