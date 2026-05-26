const express = require("express");
const products = require("./products.json");

const app = express();

app.use(express.static(__dirname));

app.get("/api/products", (req, res) => {
    res.json(products);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});