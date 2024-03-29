const { mongoose, Schema } = require("mongoose");

const TaskSchema = new Schema({
  title: String,
  timeCreated: Date,
  isCompleted: {
    status: { type: Boolean, default: false },
    timeCompleted: { type: Date, default: null },
  },
  reminder: Date,
  notes: String,
  priority: String,
  subTasks: [
    {
      title: String,
      timeCreated: Date,
      isCompleted: { type: Boolean, default: false },
      key: String,
    },
  ],
});

module.exports = mongoose.model("tasks", TaskSchema);
