const TaskController = require("../controllers/taskController");
const authentication = require("../middleware/authentication");

const router = require("express").Router();

router.get("/", TaskController.GetAllTasks);
router.post("/", authentication, TaskController.CreateTask);
router.get("/:id", TaskController.GetOneTask);

module.exports = router;
