const { mongoose, Schema } = require("mongoose");

const TaskSchema = new Schema({
  title: String,
  timeCreated: { type: Date, default: Date.now() },
  isCompleted: {
    status: { type: Boolean, default: false },
    timeCompleted: { type: Date, default: null },
  },

  notes: String,
  subTask: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
