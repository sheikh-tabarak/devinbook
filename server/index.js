// server/index.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();
const fs = require('fs');
const path = require('path');

app.use((req, res, next) => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${req.ip}\n`;
    fs.appendFileSync(path.join(__dirname, 'requests.log'), log);
    next();
});

app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.1.21:3000", "http://192.168.1.13:3000", "http://192.168.1.13:8081", 'https://devinbook.devinsol.com'],
    credentials: true
}));
app.use(express.json());

// Connection middleware to ensure DB is ready before any request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed" });
    }
});

// Health check
app.get("/api/health-check", (req, res) => {
    res.json({ status: "ok", message: "Server is healthy", timestamp: new Date() });
});

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/accounts", accountRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

