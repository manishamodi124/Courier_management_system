const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }
});

// Password hashing अब createAdmin.js में ही handle करेंगे, यहाँ pre-save नहीं चाहिए
// इसलिए कोई pre('save') hook हटा दो

module.exports = mongoose.model("Admin", adminSchema);