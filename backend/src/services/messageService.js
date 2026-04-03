const db = require("../config/db");

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function createMessage({ name, email, message }) {
  const createdAt = new Date().toLocaleString("es-ES");

  const result = await runQuery(
    `INSERT INTO messages (name, email, message, created_at, status)
     VALUES (?, ?, ?, ?, 'pending')`,
    [name, email, message, createdAt]
  );

  return result.lastID;
}

async function listMessages({ status = "pending", page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;

  const totalRow = await getQuery(
    `SELECT COUNT(*) as total FROM messages WHERE status = ?`,
    [status]
  );

  const messages = await allQuery(
    `SELECT id, name, email, message, created_at, status, reply_text, replied_at
     FROM messages
     WHERE status = ?
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
    [status, limit, offset]
  );

  return {
    messages,
    pagination: {
      page,
      limit,
      total: totalRow.total,
      totalPages: Math.max(1, Math.ceil(totalRow.total / limit)),
    },
  };
}

async function getMessageById(id) {
  return getQuery(`SELECT * FROM messages WHERE id = ?`, [id]);
}

async function updateMessageStatus(id, status) {
  await runQuery(`UPDATE messages SET status = ? WHERE id = ?`, [status, id]);
}

async function saveReply(id, reply) {
  const repliedAt = new Date().toLocaleString("es-ES");
  await runQuery(
    `UPDATE messages
     SET status = 'answered', reply_text = ?, replied_at = ?
     WHERE id = ?`,
    [reply, repliedAt, id]
  );
}

async function countMessagesByStatus(status = "pending") {
  const row = await getQuery(
    `SELECT COUNT(*) as total FROM messages WHERE status = ?`,
    [status]
  );

  return row?.total || 0;
}

module.exports = {
  createMessage,
  listMessages,
  getMessageById,
  updateMessageStatus,
  saveReply,
  countMessagesByStatus,
};