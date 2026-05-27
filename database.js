// Import MySQL2 package
const mysql = require("mysql2");

// Create database connection configuration
const db = mysql.createConnection({
    // Database host name
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "M1l@152090",
    // Database name used in the project
    database: "fitlife_store"
});

// Connect application to MySQL database
db.connect((err) => {

    // Check if connection failed
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    // Display successful connection message
    console.log("Connected to MySQL database");
});

// Export database connection to other files
module.exports = db;