const express = require("express");
const {
  postMessage,
  getMessages,
  patchMessageStatus,
  replyToMessage,
  getPendingMessagesCount,
} = require("../controllers/messageController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/messages", postMessage);
router.get("/messages/pending-count", requireAdmin, getPendingMessagesCount);
router.get("/messages", requireAdmin, getMessages);
router.patch("/messages/:id/status", requireAdmin, patchMessageStatus);
router.post("/messages/:id/reply", requireAdmin, replyToMessage);

module.exports = router;