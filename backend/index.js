const dotenv = require("dotenv");
dotenv.config({ path: './.env'})


const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
})

const PORT = 4000;
const users = [];
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
    const result = users.filter((user) => user.email === email && user.password === password);
    if (!result) {
        const id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id, email, password: hashedPassword, username };
        users.push(newUser);
        return res.json({ message: "Account created successfully!" });
    }
    res.json({ error_message: "User already exists", });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const result = users.filter((user) => user.email === email && user.password === password);
    if (!result) {
        return res.json({ error_message: "Incorrect credentials", });
    }
    // Returns the id if successfully logged in
    res.json({
        message: "Login successfully",
        id: result[0].id,
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});