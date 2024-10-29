const jwt = require("jsonwebtoken");
const hardcodedSecret = "m4npHyvEiijWJiUoJW1J";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("This is the authHeader:", authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // Extracts the token part only
    console.log("This is the token:", token);
    if (!token) return res.json({ error_message: "Unauthorized" });

    jwt.verify(token, hardcodedSecret, (err, user) => {
        if (err) return res.json({ error_message: "Token is invalid" });
        req.user = user;  // Attach user information to request object
        next();
    });
}

module.exports = authenticateToken;
