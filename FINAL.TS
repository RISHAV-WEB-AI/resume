const express = require('express');
const mysql = require('mysql');
const app = express();

// BUG 1: Hardcoded sensitive secrets (CRITICAL)
const DB_PASSWORD = "super_secret_db_password_123!";
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: DB_PASSWORD,
    database: 'users_db'
});

// BUG 2: Missing Rate Limiting (LOW) & Missing Helmet/Security headers
app.get('/api/users', (req, res) => {
    const userId = req.query.id;

    // BUG 3: SQL Injection Vulnerability (CRITICAL)
    // Directly concatenating user input into a SQL query without parameterization
    const query = "SELECT * FROM users WHERE id = " + userId;

    connection.query(query, (error, results) => {
        if (error) {
            // BUG 4: Information Leakage (MEDIUM)
            // Sending raw database error stacks to the client
            res.status(500).send(error.stack);
            return;
        }

        // BUG 5: Cross-Site Scripting (XSS) Vulnerability (HIGH)
        // Reflecting unsanitized user input directly into HTML output
        const userGreeting = "<h1>Welcome back, user ID: " + userId + "</h1>";
        
        let htmlResponse = userGreeting + "<ul>";
        
        // BUG 6: Off-by-one Logic Error & Unintended Scope (MEDIUM)
        // 'i' will exceed array bounds (<= instead of <), causing a crash
        for (var i = 0; i <= results.length; i++) {
            htmlResponse += "<li>" + results[i].name + "</li>";
        }
        
        htmlResponse += "</ul>"
        
        res.send(htmlResponse);
    });
});

// BUG 7: Syntax Error (CRITICAL)
// Missing closing parenthesis and bracket for the function
app.post('/api/admin', (req, res) => {
    console.log("Admin endpoint hit")
    res.send("Admin access granted");
// Missing: });

app.listen(3000, () => console.log('Server running on port 3000'));
