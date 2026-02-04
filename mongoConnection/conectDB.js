const mongoose = require("mongoose");

const mongoUrl =
    "mongodb+srv://Sudhakar:GitClone@gitclone.qs87lro.mongodb.net/";

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