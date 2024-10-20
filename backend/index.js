const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const userRoutes = require("./src/routes/userRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});