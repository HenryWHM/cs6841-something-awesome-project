function getUserProfileById(userId) {
    return new Promise((resolve, reject) => {
        const db = require('./index');
        const query = `SELECT username, profile_pic, about_me, isAdmin FROM accounts WHERE id = ?`;
        db.query(query, [userId], (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
}

module.exports = { getUserProfileById };