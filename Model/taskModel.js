require("dotenv").config();

const tasks = require("../Schema/taskSchema.js");
const TaskSchema = require("../Schema/taskSchema.js");

class TaskModel {
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
  async getTaskById(id) {
    try {
      const response = await tasks.findById(id);
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
  async updateTask(id, task) {
    try {
      const res = await tasks.findByIdAndUpdate(id, task);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

exports.taskModel = new TaskModel();
