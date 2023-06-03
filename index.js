const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config.js");
const { model } = require("./mongo/db_controller.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server works on port " + port);
});

app.get("/api/tasks", async (req, res) => {
  const response = await model.getTasks();
  res.send(response);
});

app.post("/api/newtask", async (req, res) => {
  const response = await model.addNewTask(req.body);
  console.log(response);
  res.send(response);
});

app.delete("/api/delete/", async (req, res) => {
  const id = req.query.id;
  console.log(id);
});
