const AuthController = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

module.exports = router;
