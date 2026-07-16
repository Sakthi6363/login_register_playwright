const express = require("express");
const cors = require("cors");

const app = express();

// Import Database
require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const auth = require("./auth");

// Routes
app.use("/api", auth);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Login Project Server Running...");
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});