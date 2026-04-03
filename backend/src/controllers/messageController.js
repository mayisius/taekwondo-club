const { transporter, isMailerConfigured, smtpFrom } = require("../config/mailer");
const {
  createMessage,
  listMessages,
  getMessageById,
  updateMessageStatus,
  saveReply,
  countMessagesByStatus,
} = require("../services/messageService");
const { validateMessageInput } = require("../utils/validators");
const { logInfo, logError } = require("../services/logger");

async function postMessage(req, res, next) {
  try {
    const validationError = validateMessageInput(req.body);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const id = await createMessage(req.body);
    logInfo("Message created", { id, email: req.body.email });

    return res.status(201).json({
      success: true,
      id,
    });
  } catch (error) {
    next(error);
  }
}

async function getMessages(req, res, next) {
  try {
    const status = req.query.status || "pending";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await listMessages({ status, page, limit });
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getPendingMessagesCount(req, res, next) {
  try {
    const total = await countMessagesByStatus("pending");
    return res.json({ total });
  } catch (error) {
    next(error);
  }
}

async function patchMessageStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await updateMessageStatus(id, status);
    logInfo("Message status updated", { id, status });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function replyToMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        error: "La respuesta no puede estar vacía",
      });
    }

    const message = await getMessageById(id);

    if (!message) {
      return res.status(404).json({
        error: "Mensaje no encontrado",
      });
    }

    let mailSent = false;

    if (isMailerConfigured && transporter) {
      try {
        await transporter.sendMail({
          from: smtpFrom,
          to: message.email,
          subject: "Respuesta del Club Taekwondo",
          text: reply,
        });
        mailSent = true;
      } catch (mailError) {
        logError("Email reply failed", {
          id,
          email: message.email,
          error: mailError.message,
        });
      }
    }

    await saveReply(id, reply);
    logInfo("Message replied", { id, email: message.email, mailSent });

    return res.json({
      success: true,
      mailSent,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postMessage,
  getMessages,
  getPendingMessagesCount,
  patchMessageStatus,
  replyToMessage,
};