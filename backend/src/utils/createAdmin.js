import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const requiredEnv = ["MONGO_URI", "ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

await connectDB();

const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });

if (existingAdmin) {
  existingAdmin.name = process.env.ADMIN_NAME;
  existingAdmin.role = "admin";
  existingAdmin.password = process.env.ADMIN_PASSWORD;
  existingAdmin.avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(process.env.ADMIN_NAME)}`;
  await existingAdmin.save();
  console.log(`Admin updated: ${existingAdmin.email}`);
} else {
  const admin = await User.create({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
    avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(process.env.ADMIN_NAME)}`
  });
  console.log(`Admin created: ${admin.email}`);
}

process.exit(0);
