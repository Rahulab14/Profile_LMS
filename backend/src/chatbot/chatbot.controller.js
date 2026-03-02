const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../auth/auth.middleware');
const { generateSQLAndResponse } = require('./ai.service');

const router = express.Router();

router.use(authenticateToken);

router.post('/query', async (req, res) => {
    const userId = req.user.id;
    const { message, model } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    try {
        const { sql, message: aiReply, updateOccurred } = await generateSQLAndResponse(message, userId, model);
        const hasUpdate = updateOccurred || sql?.trim().toUpperCase().startsWith("UPDATE");

        if (!sql || sql.trim() === '') {
            return res.json({ reply: aiReply, success: true, updateOccurred: hasUpdate });
        }

        const queryInfo = sql.trim().toUpperCase();

        if (queryInfo.startsWith("SELECT")) {
            db.all(sql, [], (err, rows) => {
                if (err) return res.status(500).json({ error: "Failed to execute database read", details: err.message });

                let finalReply = aiReply;
                if (rows && rows.length > 0) {
                    finalReply += "\n\nData found: " + JSON.stringify(rows[0]);
                }
                res.json({ reply: finalReply, success: true, data: rows, updateOccurred: hasUpdate });
            });
        } else if (queryInfo.startsWith("UPDATE")) {
            db.run(sql, [], function (err) {
                if (err) return res.status(500).json({ error: "Failed to update database", details: err.message });
                res.json({ reply: aiReply, success: true, changes: this.changes, updateOccurred: true });
            });
        } else {
            res.status(400).json({ error: "Unsupported query operation. Only SELECT and UPDATE are allowed for safety." });
        }

    } catch (error) {
        console.error("Chatbot Controller Error:", error);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

module.exports = router;
