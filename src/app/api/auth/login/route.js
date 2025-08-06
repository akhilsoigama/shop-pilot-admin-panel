import UserModel from "@/app/model/user";
import Role from "@/app/model/role"; // Import Role model to ensure registration
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();
    
    if (!mongoose.models.Role) {
      mongoose.model("Role", (await import("@/app/model/role")).schema);
    }
    if (!mongoose.models.UserPanel) {
      mongoose.model("UserPanel", (await import("@/app/model/user")).schema);
    }

    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email }).populate('role');
    if (!user) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }  

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }

    const token = generateToken(user);
    const { password: _pw, ...userData } = user.toObject();

    return NextResponse.json({ 
      token, 
      user: userData 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      error: error.message 
    }, { status: 500 });
  }
}