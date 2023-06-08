const mongoose = require("mongoose");
const tasks = require("./Schema/taskSchema.js");

const { OPTIONS, URL_DB } = require("./config.js");
const TaskSchema = require("./Schema/taskSchema.js");

class TaskModel {
  _database;
  _url;
  _options;

  constructor(url, options) {
    this._url = url;
    this._options = options;
  }
  _isConnectedToDb = () => this._database?.connection.readyState;

  async connectDb() {
    try {
      this._database = await mongoose.connect(this._url, this._options);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  //return array of tasks from db
  async getTasks() {
    try {
      const response = await tasks.find({});
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  //add new task to db
  async addNewTask(task) {
    try {
      const instance = new TaskSchema(task);
      const res = await tasks.create(instance);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  //delete task from db
  async deleteTask(id) {
    try {
      const response = await tasks.findByIdAndDelete(id);
      console.log("delete response", response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  //update task in db which is completed or not
  async taskCompleted(id) {
    try {
      const res = await tasks.findById(id);
      const { isCompleted } = res;
      const response = await tasks.findByIdAndUpdate(id, {
        isCompleted: { status: !isCompleted.status, timeCompleted: new Date() },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

const model = new TaskModel(URL_DB, OPTIONS);

exports.model = model;