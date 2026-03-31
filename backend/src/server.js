const app = require("./app");
const { port } = require("./config/env");
const { logInfo } = require("./services/logger");

app.listen(port, () => {
  logInfo(`Backend running on http://localhost:${port}`);
});