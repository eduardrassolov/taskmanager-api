require("dotenv").config();
const { connect } = require("./db.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  loadData,
  newTask,
  completeTask,
  deleteTask,
} = require("./Controller/taskController.js");
const { OPTIONS } = require("./config.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connect(process.env.DATABASE_CONNECTION, OPTIONS);
    app.listen(process.env.PORT, () => {
      console.log("Server works on port " + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

app.get("/api/v1/tasks", loadData);

app.post("/api/v1/tasks", newTask);
app.post("/api/v1/tasks/:id/complete", completeTask);

app.delete("/api/v1/tasks/:id", deleteTask);
