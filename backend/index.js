const dotenv = require("dotenv");
dotenv.config({ path: './.env'})


const express = require("express");
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
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
              console.error('Bcrypt error:', err);
              return res.json({ error_message: 'Internal server error' });
            }

            if (!isMatch) {
                console.error('Incorrect credentials');
                return res.json({ error_message: 'Incorrect credentials' });
            }

            // Returns the id if successfully logged in
            res.json({
                message: "Login successfully",
                id: user.id,
            });
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});