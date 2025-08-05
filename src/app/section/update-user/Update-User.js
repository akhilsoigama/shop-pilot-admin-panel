'use client';

import { useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '@/lib/validations/userSchema';
import axios from 'axios';

export default function UserListPage() {
  const { resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === 'dark';

  const { users, updateUser, deleteUser, refresh } = useUsers();
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    axios
      .get('/api/admin/role')
      .then((r) => setRoles(r.data))
      .catch(() => toast.error('Failed to load roles'));
  }, []);

  const onSubmit = async (data) => {
    if (!editingUser) return;
    setLoading(true);
    try {
      // Explicitly handle role removal when "No Role" is selected
      const updateData = {
        ...data,
        roleId: data.roleId === "null" ? null : data.roleId
      };
      await updateUser(editingUser._id, updateData);
      toast.success('User updated successfully');
      refresh();
      cancelEdit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    reset({
      email: user.email,
      roleId: user.role?._id || "null", // Initialize with "null" string for Select
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    reset();
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    setLoading(true);
    try {
      await deleteUser(deleteUserId);
      toast.success('User deleted successfully');
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);
      setDeleteUserId(null);
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
            <table className="w-full text-sm border-collapse text-gray-900 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-[#171717]">
                <tr>
                  <th className="p-3 border text-left">Email</th>
                  <th className="p-3 border text-left">Role</th>
                  <th className="p-3 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Email"
              {...register('email')}
              className="w-full bg-white text-black dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Select
              onValueChange={(val) => setValue('roleId', val)}
              defaultValue={editingUser.role?._id || "null"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">No Role</SelectItem>
                {roles.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.roleId && (
              <p className="text-red-500 text-sm">{errors.roleId.message}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}