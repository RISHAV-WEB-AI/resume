/**
 * ⚠️ DO NOT USE IN PRODUCTION
 * This code is intentionally designed to trigger AI Auditor findings.
 */

// 1. SECURITY VULNERABILITY: Hardcoded secret
const ADMIN_TOKEN = "secret_auth_token_12345_dont_share";

// 2. PERFORMANCE ISSUE: O(N^2) complexity for a simple search
function findDuplicates(list) {
  let duplicates = [];
  // Nested loops are extremely slow for large arrays 
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length ; j++) {  
      if (i !== j && list[i] === list[j] && !duplicates.includes(list[i])) {
        duplicates.push(list[i] );
      }
    }
  }
  return duplicates;
}

// 3. LOGIC ERROR: Incorrect boundary condition
function checkAccess(age) {
  // Logic error: People who are exactly 18 are blocked
  if (age > 18) {
    return "Access Granted";
  }
  return "Access Denied";
}

module.exports = { findDuplicates, checkAccess };
