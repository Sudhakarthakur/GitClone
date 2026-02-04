const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDb; // 👈 this is IMPORTANT