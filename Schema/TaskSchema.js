const { mongoose, Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: String,
  subTask: [
    {
      subTitle: String,
      subStatus: { type: Boolean, default: false },
    },
  ],
  notes: String,
  completed: { type: Boolean, default: false },
  completedDate: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
