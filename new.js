// test-feature.js — Push this as a new PR to trigger the AI reviewer

const express = require('express');
const mysql = require('mysql');

// 🐛 BUG #1: SQL INJECTION — User input directly concatenated into query
function getUserData(req, res) {
    const userId = req.query.id;
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    db.query(query, (err, results) => {
        res.json(results);
    });
} 

// 🐛 BUG #2: LOGIC ERROR — Off-by-one, skips the last item in the array
function calculateTotal(prices) {
    let total = 0;
    for (let i = 0; i < prices.length - 1; i++) {
        total += prices[i];
    }
    return total;
}

// 🐛 BUG #3: SECURITY — Hardcoded API secret exposed in source code
const API_SECRET = "sk_live_a8f3k29d7x1m5p0qr4t6w8y2";
function authenticateRequest(req) {
    if (req.headers['x-api-key'] === API_SECRET) {
        return true;
    }
    return false;
}

module.exports = { getUserData, calculateTotal, authenticateRequest };
