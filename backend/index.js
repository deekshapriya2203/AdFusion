const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: "eco-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  }
}));

// File uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount Routes
app.use("/api", authRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
