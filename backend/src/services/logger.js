const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "../../logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function getDateStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTimestamp() {
  return new Date().toISOString();
}

function getLogFilePath(level) {
  const date = getDateStamp();
  const fileName =
    level === "ERROR" ? `error-${date}.log` : `app-${date}.log`;

  return path.join(logsDir, fileName);
}

function safeStringify(meta = {}) {
  try {
    return JSON.stringify(meta);
  } catch {
    return '{"meta":"[unserializable]"}';
  }
}

function writeLog(level, message, meta = {}) {
  const timestamp = getTimestamp();
  const logLine = `[${timestamp}] [${level}] ${message} ${safeStringify(meta)}\n`;
  const filePath = getLogFilePath(level);

  if (level === "ERROR") {
    console.error(logLine.trim());
  } else {
    console.log(logLine.trim());
  }

  fs.appendFileSync(filePath, logLine, "utf8");
}

function logInfo(message, meta = {}) {
  writeLog("INFO", message, meta);
}

function logError(message, meta = {}) {
  writeLog("ERROR", message, meta);
}

module.exports = {
  logInfo,
  logError,
};