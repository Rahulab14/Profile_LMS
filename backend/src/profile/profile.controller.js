const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../auth/auth.middleware');

const router = express.Router();

router.use(authenticateToken);

router.get('/me', (req, res) => {
    const userId = req.user.id;
    const queries = [
        new Promise((resolve, reject) => db.get('SELECT * FROM personal_info WHERE user_id = ?', [userId], (err, row) => err ? reject(err) : resolve({ personal_info: row }))),
        new Promise((resolve, reject) => db.get('SELECT * FROM education WHERE user_id = ?', [userId], (err, row) => err ? reject(err) : resolve({ education: row }))),
        new Promise((resolve, reject) => db.get('SELECT * FROM course_info WHERE user_id = ?', [userId], (err, row) => err ? reject(err) : resolve({ course_info: row })))
    ];

    Promise.all(queries)
        .then(results => {
            const profile = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            res.json(profile);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.put('/update', (req, res) => {
    const userId = req.user.id;
    const { personal_info, education, course_info } = req.body;

    if (personal_info) {
        const { name, dob, gender } = personal_info;
        db.run(`UPDATE personal_info SET name = ?, dob = ?, gender = ? WHERE user_id = ?`, [name, dob, gender, userId]);
    }

    if (education) {
        const { board_10, percentage_10, board_12, percentage_12 } = education;
        db.run(`UPDATE education SET board_10 = ?, percentage_10 = ?, board_12 = ?, percentage_12 = ? WHERE user_id = ?`, [board_10, percentage_10, board_12, percentage_12, userId]);
    }

    if (course_info) {
        const { course_enrolled, courses_count, modules_count, certificates_count } = course_info;
        if (course_enrolled !== undefined) {
            db.run(`UPDATE course_info SET course_enrolled = ? WHERE user_id = ?`, [course_enrolled, userId]);
        }
        if (courses_count !== undefined) {
            db.run(`UPDATE course_info SET courses_count = ? WHERE user_id = ?`, [courses_count, userId]);
        }
        if (modules_count !== undefined) {
            db.run(`UPDATE course_info SET modules_count = ? WHERE user_id = ?`, [modules_count, userId]);
        }
        if (certificates_count !== undefined) {
            db.run(`UPDATE course_info SET certificates_count = ? WHERE user_id = ?`, [certificates_count, userId]);
        }
    }

    res.json({ message: "Profile updated successfully" });
});

module.exports = router;
