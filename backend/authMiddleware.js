const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.json({ error_message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.json({ error_message: "Token is invalid" });
        req.user = user;  // Attach user information to request object
        next();
    });
}

module.exports = authenticateToken;
