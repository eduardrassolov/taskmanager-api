const mongoose = require("mongoose");
const tasks = require("../Schema/TaskSchema.js");

const { OPTIONS, URL_DB } = require("../config.js");
const TaskSchema = require("../Schema/TaskSchema.js");

class TaskModel {
  _database;
  _url;
  _options;

  constructor(url, options) {
    this._url = url;
    this._options = options;
  }

  async connectDb() {
    this._database = await mongoose.connect(this._url, this._options);
    console.log(this._database);
  }

  async addTask() {
    //await mongoose.connect(URL_DB, OPTIONS);
  }
  async getTasks() {
    try {
      await mongoose.connect(URL_DB, OPTIONS);
      const response = await tasks.find({});
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  async addNewTask(task) {
    try {
      await mongoose.connect(URL_DB, OPTIONS);
      const instance = new TaskSchema(task);
      const res = await tasks.create(instance);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteTask(id) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}

const model = new TaskModel(URL_DB, OPTIONS);

exports.model = model;
