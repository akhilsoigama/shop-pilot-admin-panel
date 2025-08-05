import UserModel from '@/app/model/user';
import { connectDB } from '@/lib/db';
import { requirePermission } from '@/lib/requirePermission';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const error = await requirePermission('create-user')(req);
  if (error) return error;

  const { email, password, roleId } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, password: hashed, role: roleId });
  return NextResponse.json(user);
}

export async function GET(req) {
  await connectDB();
  const error = await requirePermission('read-user')(req);
  if (error) return error;

  const users = await UserModel.find().populate('role');
  return NextResponse.json(users);
}
