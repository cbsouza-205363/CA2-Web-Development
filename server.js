const express = require("express");
const db = require("./database");

const app = express();

app.use(express.static(__dirname));

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json(results);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});