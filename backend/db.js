const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dee_chethu",
  database: "adgenai"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL connected successfully");
});

module.exports = db;
