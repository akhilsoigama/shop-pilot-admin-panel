import { connectDB } from '@/lib/db';
import { requirePermission } from '@/lib/requirePermission';
import UserModel from '@/app/model/user';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  await connectDB();
  const {id}= await params
  const err = await requirePermission('update-user')(req);
  if (err) return err;
  const { name, mobile, email, roleId } = await req.json();
  const updated = await UserModel.findByIdAndUpdate(id, { name, mobile, email, role: roleId }, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const {id} = await params;
  const err = await requirePermission('delete-user')(req);
  if (err) return err;
  await UserModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
