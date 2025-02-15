const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/sensorDB";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Sensor Schema & Model
const sensorSchema = new mongoose.Schema({
    name: String,
    value: Number,
    timestamp: { type: Date, default: Date.now }
});

const Sensor = mongoose.model("Sensor", sensorSchema);

// API Route to fetch sensor data
app.get("/api/sensors", async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (error) {
        console.error("❌ Error fetching sensor data:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
