const bcrypt = require("bcryptjs");
const { admin } = require("../config/env");
const { signAdminToken } = require("./tokenService");

async function loginAdmin(username, password) {
  if (username !== admin.username) {
    return null;
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isValid) {
    return null;
  }

  return signAdminToken({
    role: "admin",
    username: admin.username,
  });
}

module.exports = {
  loginAdmin,
};