const { taskModel } = require("../Model/taskModel.js");

exports.loadData = async function (_, res) {
  try {
    const response = await taskModel.getTasks();
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};

exports.loadTaskById = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await taskModel.getTask(id);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};

exports.newTask = async function (req, res) {
  try {
    const response = await taskModel.addNewTask(req.body);
    console.log(response);
    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
};

exports.completeTask = async function (req, res) {
  const { id } = req.params;
  const response = await taskModel.taskComplete(id);
  res.send(response);
};

exports.deleteTask = async function (req, res) {
  const { id } = req.params;
  const response = await taskModel.deleteTask(id);
  res.send(response?.title);
};
