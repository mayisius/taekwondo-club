const {
  listNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../services/noticeService");

async function getAllNotices(req, res, next) {
  try {
    const notices = await listNotices();
    return res.json({ notices });
  } catch (error) {
    next(error);
  }
}

async function postNotice(req, res, next) {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        error: "Título y contenido son obligatorios",
      });
    }

    const id = await createNotice({ title, body });

    return res.status(201).json({
      success: true,
      id,
    });
  } catch (error) {
    next(error);
  }
}

async function putNotice(req, res, next) {
  try {
    const { id } = req.params;
    const { title, body, isPublished } = req.body;

    await updateNotice(id, { title, body, isPublished });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function removeNotice(req, res, next) {
  try {
    const { id } = req.params;

    await deleteNotice(id);

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllNotices,
  postNotice,
  putNotice,
  removeNotice,
};