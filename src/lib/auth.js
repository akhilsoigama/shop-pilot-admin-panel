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


export async function getUserFromHeader(req) {
  try {
    await connectDB();
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserModel.findById(decoded.id).populate({
      path: 'role',
      populate: { path: 'permissions' }
    })

    return user
  } catch (err) {
    return null
  }
}