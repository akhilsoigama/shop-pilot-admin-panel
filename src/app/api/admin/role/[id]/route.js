import UserRole from "@/app/model/role";
import { connectDB } from "@/lib/db";
import { requirePermission } from "@/lib/requirePermission";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectDB();
  const error = await requirePermission("update-role")(req);
  if (error) return error;

  const { name, permissions } = await req.json();

  if (!name || !Array.isArray(permissions)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const role = await UserRole.findByIdAndUpdate(
    params.id,
    { name, permissions },
    { new: true }
  );

  return NextResponse.json(role);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const error = await requirePermission("delete-role")(req);
  if (error) return error;

  await UserRole.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
