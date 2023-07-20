require("dotenv").config();
const { connect } = require("./db.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  // loadData,
  loadUncompletedTasks,
  loadCompletedTasks,
  loadTaskById,
  newTask,
  completeTask,
  deleteTask,
  updateTask,
} = require("./controller/taskController.js");
const { OPTIONS } = require("./config.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  const port = process.env.PORT || 3000;
  try {
    await connect(process.env.DATABASE_CONNECTION, OPTIONS);
    app.listen(port, () => {
      console.log("Server works on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

// app.get("/api/v1/tasks", loadData);
app.get("/api/v1/tasks", loadUncompletedTasks);
app.get("/api/v1/tasks/completed", loadCompletedTasks);
app.get("/api/v1/tasks/:id", loadTaskById);
app.post("/api/v1/tasks", newTask);
app.post("/api/v1/tasks/:id/complete", completeTask);
app.put("/api/v1/tasks/:id/update", updateTask);
app.delete("/api/v1/tasks/:id/delete", deleteTask);
