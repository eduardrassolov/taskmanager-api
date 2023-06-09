require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { model } = require("./taskController.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, async (_, res) => {
  console.log("Server works on port " + process.env.PORT);
  try {
    await model.connectDb();
  } catch (error) {
    res.send("Auth failed");
  }
});

app.get("/api/v1/tasks", async (req, res) => {
  try {
    const response = await model.getTasks();
    res.send(response);
  } catch (err) {
    switch (err) {
      case "no data":
        console.log(err);
        res.status(404).json({ error: "Data not found" });
        break;
      default:
        break;
    }
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
