const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Name, email, and password required" });
    email = email.toLowerCase();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        db.run(
            `INSERT INTO users (email, password_hash) VALUES (?, ?)`,
            [email, hash],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: "Email already exists" });
                    return res.status(500).json({ error: "Database error" });
                }

                const userId = this.lastID;

                // Setup empty profile data for the new user, including the provided name
                db.run(`INSERT INTO personal_info (user_id, email, name, dob, gender, mobile, location, profile_image) VALUES (?, ?, ?, '', '', '', '', '')`, [userId, email, name]);
                db.run(`INSERT INTO education (user_id, board_10, percentage_10, board_12, percentage_12) VALUES (?, '', null, '', null)`, [userId]);
                db.run(`INSERT INTO course_info (user_id, course_enrolled, application_status, courses_count, modules_count, certificates_count, course_duration, course_fee) VALUES (?, '', 'Pending', 3, 12, 2, '', '')`, [userId]);

                res.status(201).json({ message: "User registered successfully" });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    email = email.toLowerCase();

    console.log(`Login attempt for email: ${email}`);
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ error: "Database error" });
        }
        if (!user) {
            console.log(`Login failed: User with email ${email} not found.`);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log(`Login failed: Password mismatch for email ${email}.`);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log(`Login successful for email: ${email}`);
        const token = generateToken(user);
        res.json({ token, user: { id: user.id, email: user.email } });
    });
});

module.exports = router;
