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
        const updates = [];
        const params = [];
        if (personal_info.name !== undefined) { updates.push('name = ?'); params.push(personal_info.name); }
        if (personal_info.dob !== undefined) { updates.push('dob = ?'); params.push(personal_info.dob); }
        if (personal_info.gender !== undefined) { updates.push('gender = ?'); params.push(personal_info.gender); }
        if (personal_info.mobile !== undefined) { updates.push('mobile = ?'); params.push(personal_info.mobile); }
        if (personal_info.location !== undefined) { updates.push('location = ?'); params.push(personal_info.location); }
        if (personal_info.profile_image !== undefined) { updates.push('profile_image = ?'); params.push(personal_info.profile_image); }
        if (personal_info.email !== undefined) {
            updates.push('email = ?');
            params.push(personal_info.email.toLowerCase());
            db.run(`UPDATE users SET email = ? WHERE id = ?`, [personal_info.email.toLowerCase(), userId], (err) => {
                if (err) console.error("Error updating users email:", err);
            });
        }

        if (updates.length > 0) {
            params.push(userId);
            db.run(`UPDATE personal_info SET ${updates.join(', ')} WHERE user_id = ?`, params);
        }
    }

    if (education) {
        const { board_10, percentage_10, board_12, percentage_12 } = education;
        db.run(`UPDATE education SET board_10 = ?, percentage_10 = ?, board_12 = ?, percentage_12 = ? WHERE user_id = ?`, [board_10, percentage_10, board_12, percentage_12, userId]);
    }

    if (course_info) {
        const { course_enrolled, application_status, courses_count, modules_count, certificates_count, course_duration, course_fee } = course_info;
        if (course_enrolled !== undefined) {
            db.run(`UPDATE course_info SET course_enrolled = ? WHERE user_id = ?`, [course_enrolled, userId]);
        }
        if (application_status !== undefined) {
            db.run(`UPDATE course_info SET application_status = ? WHERE user_id = ?`, [application_status, userId]);
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
        if (course_duration !== undefined) {
            db.run(`UPDATE course_info SET course_duration = ? WHERE user_id = ?`, [course_duration, userId]);
        }
        if (course_fee !== undefined) {
            db.run(`UPDATE course_info SET course_fee = ? WHERE user_id = ?`, [course_fee, userId]);
        }
    }

    res.json({ message: "Profile updated successfully" });
});

module.exports = router;
