'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { useTheme as useNextTheme } from 'next-themes';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ email: '', roleId: '' });
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // for modal

  const { resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === 'dark';

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      toast.error('Failed to load users');
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get('/api/admin/role', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch {
      toast.error('Failed to load roles');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const startEdit = (user) => {
    setEditingUser(user);
    setForm({ email: user.email, roleId: user.role?._id || 'none' });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setForm({ email: '', roleId: '' });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    setLoading(true);
    try {
      const updatedData = {
        email: form.email,
        roleId: form.roleId === 'none' ? null : form.roleId,
      };
      await axios.put(`/api/admin/user/${editingUser._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Updated');
      fetchUsers();
      cancelEdit();
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    setLoading(true);
    try {
      await axios.delete(`/api/admin/user/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Deleted');
      fetchUsers();
    } catch {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
      setDeleteUserId(null); // close modal
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <Typography variant="h4" className="text-gray-900 dark:text-gray-100">
        Users
      </Typography>

      <Card className="bg-white dark:bg-[#171717] shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white dark:bg-[#171717] text-gray-900 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-[#171717]">
                <tr>
                  <th className="p-3 border text-left">Email</th>
                  <th className="p-3 border text-left">Role</th>
                  <th className="p-3 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-3 whitespace-nowrap">{u.email}</td>
                    <td className="p-3 whitespace-nowrap text-center">
                      {u.role?.name || '—'}
                    </td>
                    <td className="p-3 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(u)}>
                        Edit
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setDeleteUserId(u._id)}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white dark:bg-[#121212]">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                              Confirm Deletion
                            </DialogTitle>
                          </DialogHeader>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Are you sure you want to delete this user?
                          </p>
                          <DialogFooter className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setDeleteUserId(null)}
                              disabled={loading}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDelete}
                              disabled={loading}
                            >
                              {loading ? 'Deleting...' : 'Delete'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {editingUser && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border p-4 rounded bg-gray-50 dark:bg-[#171717] space-y-4"
        >
          <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
            Edit: {editingUser.email}
          </Typography>
          <div className="space-y-4">
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full bg-white text-black dark:text-white"
            />
            <Select
              value={form.roleId}
              onValueChange={(v) => setForm({ ...form, roleId: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Role</SelectItem>
                {roles.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <Button variant="outline" onClick={cancelEdit} disabled={loading}>
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
