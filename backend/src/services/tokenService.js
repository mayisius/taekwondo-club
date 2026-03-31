const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

function signAdminToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
}

function verifyAdminToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  signAdminToken,
  verifyAdminToken,
};