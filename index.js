const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config.js");
const { model } = require("./taskController.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, async () => {
  console.log("Server works on port " + port);
  await model.connectDb();
});

app.get("/api/v1/tasks", async (req, res) => {
  try {
    const response = await model.getTasks();
    res.send(response);
  } catch (error) {
    throw error;
  }
});

app.post("/api/v1/tasks", async (req, res) => {
  const response = await model.addNewTask(req.body);
  res.send(response);
});

app.post("/api/v1/tasks/:id/complete", async (req, res) => {
  const { id } = req.params;
  const response = await model.taskComplete(id);
  res.send(response);
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const response = await model.deleteTask(id);
  res.send(response?.title);
});
