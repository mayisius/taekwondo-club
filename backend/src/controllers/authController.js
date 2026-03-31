const { loginAdmin } = require("../services/authService");
const { logInfo } = require("../services/logger");

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const token = await loginAdmin(username, password);

    if (!token) {
      return res.status(401).json({
        error: "Credenciales incorrectas",
      });
    }

    logInfo("Admin login success", { username });

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};