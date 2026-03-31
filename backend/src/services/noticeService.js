const db = require('../config/db');

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
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

async function listNotices() {
  return allQuery(`SELECT * FROM notices ORDER BY id DESC`);
}

async function createNotice({ title, body }) {
  const createdAt = new Date().toLocaleString('es-ES');
  const result = await runQuery(
    `INSERT INTO notices (title, body, is_published, created_at)
     VALUES (?, ?, 1, ?)`,
    [title, body, createdAt]
  );
  return result.lastID;
}

async function updateNotice(id, { title, body, isPublished }) {
  await runQuery(
    `UPDATE notices SET title = ?, body = ?, is_published = ? WHERE id = ?`,
    [title, body, isPublished ? 1 : 0, id]
  );
}

async function deleteNotice(id) {
  await runQuery(`DELETE FROM notices WHERE id = ?`, [id]);
}

module.exports = {
  listNotices,
  createNotice,
  updateNotice,
  deleteNotice,
};