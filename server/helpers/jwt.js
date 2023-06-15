const jwt = require("jsonwebtoken");

const KEY = process.env.JWT_SECRET;

const signToken = (payload) => jwt.sign(payload, KEY);
const verifyToken = (token) => jwt.verify(token, KEY);

module.exports = {
  signToken,
  verifyToken,
};
