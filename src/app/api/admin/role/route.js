import UserRole from "@/app/model/role";
import { connectDB } from "@/lib/db";
import { requirePermission } from "@/lib/requirePermission";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const error = await requirePermission("create-role")(req);
  if (error) return error;

  const { name, permissions } = await req.json();

  if (!name || !Array.isArray(permissions)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const exists = await UserRole.findOne({ name });
  if (exists) {
    return NextResponse.json({ error: "Role already exists" }, { status: 409 });
  }

  const role = await UserRole.create({ name, permissions });
  return NextResponse.json(role);
}

export async function GET() {
  await connectDB();
  const roles = await UserRole.find();
  return NextResponse.json(roles);
}
