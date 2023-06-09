require("dotenv").config();
const mongoose = require("mongoose");
const tasks = require("./Schema/taskSchema.js");

const { OPTIONS, URL_DB } = require("./config.js");
const TaskSchema = require("./Schema/taskSchema.js");

class TaskModel {
  _options;

  constructor(options) {
    this._options = options;
  }
  _isConnectedToDb = () => this._database?.connection.readyState;

  async connectDb() {
    try {
      this._database = await mongoose.connect(process.env.DATABASE_CONNECTION, {
        ...this._options,
        dbName: process.env.DATABASE_NAME,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  //return array of tasks from db
  async getTasks() {
    try {
      const response = await tasks.find({});
      if (!response) throw new Error("no data");
      return response;
    } catch (err) {
      throw err;
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
  async taskComplete(id) {
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

const model = new TaskModel(OPTIONS);

exports.model = model;
