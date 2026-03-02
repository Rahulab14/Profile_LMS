const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'kalviumlabs_forge.sqlite');
const db = new sqlite3.Database(dbPath);

async function seed() {
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
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password123', salt);

    db.get('SELECT id FROM users WHERE email = ?', ['lsm@gmail.com'], (err, row) => {
        if (!row) {
            db.run(`INSERT INTO users (email, password_hash) VALUES (?, ?)`, ['lsm@gmail.com', hash], function (err) {
                if (err) {
                    console.error("Error inserting user:", err);
                    return;
                }
                const userId = this.lastID;
                db.run(`INSERT INTO personal_info (user_id, email, name, dob, gender) VALUES (?, ?, 'Kalvium Student', '2000-01-01', 'Other')`, [userId, 'lsm@gmail.com']);
                db.run(`INSERT INTO education (user_id, board_10, percentage_10, board_12, percentage_12) VALUES (?, 'CBSE', 85, 'State Board', 90)`, [userId]);
                db.run(`INSERT INTO course_info (user_id, course_enrolled, application_status) VALUES (?, 'B.Tech CSE', 'Admitted')`, [userId]);
                console.log('Seeded lsm@gmail.com successfully with mock data.');
            });
        } else {
            console.log('User lsm@gmail.com already exists.');
        }
    });

    setTimeout(() => db.close(), 1000);
}

seed();
