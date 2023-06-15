const TaskController = require("../controllers/taskController");

const router = require("express").Router();

router.get("/", TaskController.GetAllTasks);

module.exports = router;
