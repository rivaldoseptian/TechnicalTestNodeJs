const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class AuthController {
  static async Register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };
      const user = await User.create({ email, password });
      res.status(201).json({ message: "Success Register" });
    } catch (error) {
      next(error);
    }
  }
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "Invalid Email/Password" };

      const isPassword = comparePassword(password, user.password);
      if (!isPassword) throw { name: "Invalid Email/Password" };

      const payload = {
        id: user.id,
      };

      const access_token = signToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
