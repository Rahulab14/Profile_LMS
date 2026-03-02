const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, '../database/kalviumlabs_forge.sqlite');
const db = new sqlite3.Database(dbPath);

const resetPassword = async (email, newPassword) => {
    try {
        const salt = await bcrypt.getSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        db.run(`UPDATE users SET password_hash = ? WHERE email = ?`, [hash, email], function (err) {
            if (err) {
                console.error('Error updating password:', err.message);
            } else if (this.changes === 0) {
                console.log(`User ${email} not found.`);
            } else {
                console.log(`Password for ${email} has been reset successfully to 'password123'.`);
            }
            db.close();
        });
    } catch (error) {
        console.error('Error:', error.message);
        db.close();
    }
};

resetPassword('test@kalvium.com', 'password123');
