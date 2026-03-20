import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { ROLES } from "./constants.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@college.edu";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const adminCollegeId = process.env.ADMIN_COLLEGE_ID || "ADMIN001";

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    collegeId: adminCollegeId,
    name: "Campus Administrator",
    email: adminEmail,
    password: adminPassword,
    role: ROLES.ADMIN,
    department: "Administration"
  });

  console.log("Admin seeded successfully");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
