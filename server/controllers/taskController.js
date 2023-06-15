const { Task } = require("../models");

class TaskController {
  static async GetAllTasks(req, res, next) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
