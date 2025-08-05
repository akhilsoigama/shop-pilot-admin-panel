import UserModel from "@/app/model/user";
import jwt from "jsonwebtoken";
import { connectDB } from "./db";

const SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};

// ✅ Updated to get token from cookie
export async function getUserFromHeader(req) {
  try {
    await connectDB();

    const cookie = req.headers.get("cookie");
    if (!cookie) return null;

    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    return user;
  } catch (err) {
    return null;
  }
}
