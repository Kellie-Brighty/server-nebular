const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to check server status
app.get("/api/status", (req, res) => {
  res.json({
    status: "active",
    message: "🚀 Server Nebular is active and running!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server Nebular is running on http://localhost:${PORT}`);
});
