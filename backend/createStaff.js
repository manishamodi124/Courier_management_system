require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Staff = require("./models/Staff");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function createStaff() {
  const hashed = await bcrypt.hash("123456", 10);
  let staff = await Staff.findOne({ email: "staff@gmail.com" });
  if (staff) {
    staff.password = hashed;
    await staff.save();
    console.log("Staff password updated:", staff);
  } else {
    staff = new Staff({
      name: "Test Staff",
      email: "staff@gmail.com",
      password: hashed
    });
    await staff.save();
    console.log("Staff created:", staff);
  }
  process.exit();
}

createStaff();