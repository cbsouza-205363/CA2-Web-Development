// Import Express framework to create the web server
const express = require("express");
// Import database connection from database.js file
const db = require("./database");
// Create Express application instance
const app = express();
// Serve static files such as HTML, CSS, images and JavaScript from the current directory
app.use(express.static(__dirname));
// API route used to retrieve all products from the MySQL database
app.get("/api/products", (req, res) => {
    // Execute SQL query to get all records from products table
    db.query("SELECT * FROM products", (err, results) => {
        // Return error message if database query fails
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Send the products data as a JSON response to the client
        res.json(results);
    });
});
// Define server port number
const PORT = 3000;
// Start server and listen for incoming requests
app.listen(PORT, () => {
    // Display confirmation message in terminal when the server is successfully running
    console.log("Server running on port 3000");
});