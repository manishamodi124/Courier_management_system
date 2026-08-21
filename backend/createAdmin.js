require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  const hash = await bcrypt.hash("123456", 10);
  const existing = await Admin.findOne({ email: "admin@gmail.com" });
  if (existing) {
    existing.password = hash;
    await existing.save();
    console.log("Admin password updated:", existing);
  } else {
    const admin = new Admin({
      email: "admin@gmail.com",
      password: hash,
      role: "admin"
    });
    await admin.save();
    console.log("Admin created:", admin);
  }
  process.exit();
}

createAdmin();