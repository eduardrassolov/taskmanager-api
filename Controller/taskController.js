const { taskModel } = require("../model/taskModel.js");

const filters = {
  // uncompleted: { isCompleted: { status: false, timeCompleted: null } },
  uncompleted: { "isCompleted.status": false },
  completed: { "isCompleted.status": true },
};

exports.loadData = async function (_, res) {
  try {
    const response = await taskModel.getTasks();
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};
exports.loadUncompletedTasks = async function (req, res) {
  try {
    const response = await taskModel.getTasks(filters.uncompleted);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};
exports.loadCompletedTasks = async function (req, res) {
  try {
    const response = await taskModel.getTasks(filters.completed);
    console.log("compl", response);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};

exports.loadTaskById = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await taskModel.getTaskById(id);
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

exports.updateTask = async function (req, res) {
  try {
    const { id } = req.params;
    const response = await taskModel.updateTask(id, req.body);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};
