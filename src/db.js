// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pastes.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS pastes (id TEXT PRIMARY KEY, content TEXT, created_at TEXT)');
});

module.exports = db;
