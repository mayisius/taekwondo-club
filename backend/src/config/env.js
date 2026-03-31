require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT || 3001),
  jwtSecret: process.env.JWT_SECRET || "change_me",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
  },
  admin: {
    username: process.env.ADMIN_USERNAME || "maya_admin",
    passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
  },
};