const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
