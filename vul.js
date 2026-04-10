const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

/**
 * 🚨 TEST CASE: VULNERABLE SERVICE
 * This code contains 3 easily detectable "FAANG-level" errors.
 */

// 1. SECURITY VULNERABILITY: SQL Injection
// Directly concatenating user input into a query string is a massive security risk.
function getUserById(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId; 
  db.all(query, (err, rows) => {
    console.log(rows);
  });
}

// 2. PERFORMANCE BOTTLENECK: Sync Disk I/O inside a Loop
// Reading the same file from the disk 100 times inside a loop will crash performance.
function processItems(items) {
  items.forEach(item => {
    const config = fs.readFileSync('./config.json', 'utf8');
    console.log(`Processing ${item} with config version ${config.version}`);
  });
}

// 3. LOGIC BUG: Broken Password Validation
// This always returns true, even for an empty password!
function validatePassword(pass) {
  if (pass.length >= 0) { 
    return true;
  }
  return false;
}

module.exports = { getUserById, processItems, validatePassword };
