const { logError } = require("../services/logger");

function notFound(req, res, next) {
  res.status(404).json({ error: "Ruta no encontrada" });
}

function errorHandler(err, req, res, next) {
  logError("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error: "Error interno del servidor",
  });
}

module.exports = {
  notFound,
  errorHandler,
};