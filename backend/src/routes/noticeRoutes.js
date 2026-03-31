const express = require("express");
const {
  getAllNotices,
  postNotice,
  putNotice,
  removeNotice,
} = require("../controllers/noticeController");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/notices", getAllNotices);
router.post("/notices", requireAdmin, postNotice);
router.put("/notices/:id", requireAdmin, putNotice);
router.delete("/notices/:id", requireAdmin, removeNotice);

module.exports = router;