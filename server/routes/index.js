const router = require("express").Router();

const tasks = require("./task");
const auth = require("./auth");

router.use("/tasks", tasks);
router.use("/auth", auth);

module.exports = router;
