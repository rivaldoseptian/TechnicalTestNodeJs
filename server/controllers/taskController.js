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
  static async CreateTask(req, res, next) {
    try {
      const { title, description } = req.body;
      const task = await Task.create({
        title,
        description,
        completed: false,
      });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }
  static async GetOneTask(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) throw { name: "Task Not Found" };
      const task = await Task.findByPk(id);
      if (!task) throw { name: "Task Not Found" };
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async UpdateCompleted(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) throw { name: "Task Not Found" };
      const { completed } = req.body;
      const task = await Task.findByPk(id);
      if (!task) throw { name: "Task Not Found" };
      await Task.update({ completed }, { where: { id } });
      res.status(200).json({ message: "Success Update Tasks" });
    } catch (error) {
      next(error);
    }
  }

  static async DeleteTask(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) throw { name: "Task Not Found" };
      const task = await Task.findByPk(id);
      if (!task) throw { name: "Task Not Found" };
      await Task.destroy({ where: { id } });
      res.status(200).json({ message: "Success Delete Task" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
