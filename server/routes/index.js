const router = require("express").Router();

const tasks = require("./task");

router.use("/tasks", tasks);

module.exports = router;
