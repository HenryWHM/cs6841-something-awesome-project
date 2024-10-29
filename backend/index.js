const dotenv = require("dotenv");
dotenv.config({ path: './.env'})


const express = require("express");
const authenticateToken = require("./authMiddleware");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const PORT = 4000;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected...")
    }
})

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.post("/api/register", async(req, res) => {
    const { email, password, username } = req.body;
    // Check if the email is already in the database
    const checkSQL = "SELECT * FROM accounts WHERE email = ?";
    db.query(checkSQL, [email], (err, result) => {
        if (err) {
            console.error('Database error during email check:', err);
            return res.json({ error_message: "Database error during email check." });
        }
        if (result.length > 0) {
            console.error('Email already exists.');
            return res.json({ error_message: "Email already exists." });
        } else {
            const id = uuidv4();
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.json({ error_message: "Error hashing password." });
                }
                const details = [id, username, email, hashedPassword];
                // Insert the new user into the database with UUID
                const insertSQL = "INSERT INTO accounts (`id`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)";
                db.query(insertSQL, details, (err, data) => {
                    if (err) {
                        console.error('Error in creating account:', err);
                        return res.json({ error_message: "Error in creating account" });
                    }
                    console.log('Success: Created new account!');
                    return res.json({ message: "Account created successfully!" });
                });
            });
        };
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM accounts WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ error_message: 'Internal server error' });
        }

        if (results.length === 0) {
            console.error('Incorrect credentials');
            return res.json( { error_message: 'Incorrect credentials' });
        }

        const user = results[0];
        console.log('User data:', user);

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.error('Bcrypt error:', err);
              return res.json({ error_message: 'Internal server error' });
            }

            if (!isMatch) {
                console.error('Incorrect credentials');
                return res.json({ error_message: 'Incorrect credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Login successful", token });
        });
    });
});

app.get("/api/user/profile", authenticateToken, (req, res) => {
    const userId = req.user.userId;
    const sql = "SELECT username, email, profile_pic, about_me, FROM users WHERE id = ?";

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user profile:", err);
            return res.json({ error_message: "Internal server error" });
        }

        // Check if the user was found
        if (result.length === 0) {
            return res.json({ error_message: "User not found" });
        }

        res.json(result[0]);
    });
});

// Update user profile data (only updates `profile_pic` and `about_me`)
app.get("/api/user/profile/:userId", (req, res) => {
    const { userId } = req.params;
    const { profile_pic, about_me } = req.body;
    const updateSQL = `UPDATE accounts SET profile_pic = ?, about_me = ? WHERE id = ?`;

    db.query(updateSQL, [profile_pic, about_me, userId], (err) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.json({ error_message: "Internal server error" });
        }
        res.json( {message: "Profile updated successfully" });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});