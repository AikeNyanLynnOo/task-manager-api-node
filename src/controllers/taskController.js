const Task = require("../models/Task");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { text, color } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const task = new Task({ text, color });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a task as completed
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { text, completed, color } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { text, completed, color },
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark all tasks as completed
const completeAllTasks = async (req, res) => {
  try {
    const updatedTasks = await Task.updateMany({}, { completed: true }); // Set `completed` to true for all tasks
    res.status(200).json({
      message: "All tasks marked as completed",
      updatedCount: updatedTasks.nModified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all completed tasks
const deleteCompletedTasks = async (req, res) => {
  try {
    const deletedTasks = await Task.deleteMany({ completed: true }); // Delete all tasks with completed: true
    res.status(200).json({
      message: `${deletedTasks.deletedCount} tasks deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeAllTasks,
  deleteCompletedTasks,
};
