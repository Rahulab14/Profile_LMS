const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'kalviumlabs_forge.sqlite');

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error("Database connection error:", err.message);
        } else {
            console.log('Connected to the SQLite database.');
            // Auto-create tables if they don't exist
            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL
                )`);
                db.run(`CREATE TABLE IF NOT EXISTS personal_info (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    name TEXT,
                    dob TEXT,
                    gender TEXT,
                    email TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )`);
                db.run(`CREATE TABLE IF NOT EXISTS education (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    board_10 TEXT,
                    percentage_10 REAL,
                    board_12 TEXT,
                    percentage_12 REAL,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )`);
                db.run(`CREATE TABLE IF NOT EXISTS course_info (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    course_enrolled TEXT,
                    application_status TEXT,
                    courses_count INTEGER DEFAULT 0,
                    modules_count INTEGER DEFAULT 0,
                    certificates_count INTEGER DEFAULT 0,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                )`);
            });
        }
    }
);

module.exports = db;

