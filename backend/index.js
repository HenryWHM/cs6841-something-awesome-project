const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const userRoutes = require("./src/routes/userRoutes");
const users = [];
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});