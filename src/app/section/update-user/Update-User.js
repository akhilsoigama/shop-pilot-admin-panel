'use client';

import { useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '@/lib/validations/userSchema';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Edit, Trash2, UserPlus, Search, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import RHFFormField from '@/app/components/controllers/RHFFormField';

export default function UserListPage() {
  const { users, updateUser, deleteUser, refresh, isLoading } = useUsers();
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
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
      roleId: user.role?._id || "null",
      name: user.name || '',
      mobile: user.mobile || '',
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

  const filteredUsers = users?.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.role?.name && user.role.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNew = () => {
    router.push('/dashboard/createUser');
  };

  const handleCreateSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/admin/user', {
        ...data,
        roleId: data.roleId === "null" ? null : data.roleId
      });
      toast.success('User created successfully');
      refresh();
      setIsCreating(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground text-sm">
            Manage all registered users and their permissions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <X 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
          <Button onClick={handleCreateNew}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.image} alt={user.email} />
                              <AvatarFallback>
                                {user.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          {user.role ? (
                            <Badge variant="outline">{user.role.name}</Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? 'default' : 'secondary'}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => startEdit(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit User</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="icon"
                                      onClick={() => setDeleteUserId(user._id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Confirm Deletion</DialogTitle>
                                      <DialogDescription>
                                        Are you sure you want to delete this user? This action cannot be undone.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <p className="text-sm">
                                        You're about to delete <span className="font-medium">{user.email}</span>.
                                      </p>
                                    </div>
                                    <DialogFooter>
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
                                        {loading ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Deleting...
                                          </>
                                        ) : (
                                          'Delete User'
                                        )}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </TooltipTrigger>
                              <TooltipContent>Delete User</TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {(editingUser || isCreating) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border rounded-lg overflow-hidden"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {isCreating ? 'Create New User' : `Edit: ${editingUser.email}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form 
                  onSubmit={handleSubmit(isCreating ? handleCreateSubmit : onSubmit)} 
                  className="space-y-4"
                >
                  <div>
                     <RHFFormField
                      name="name"
                      control={control}
                      error={errors}
                      label="User Name"
                    />
                    <RHFFormField
                      name="email"
                      control={control}
                      error={errors}
                      label="Email"
                    />
                    <RHFFormField
                      name="mobile"
                      control={control}
                      error={errors}
                      label="Mobile Number"
                      
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <Select
                      onValueChange={(val) => setValue('roleId', val)}
                      defaultValue={isCreating ? "null" : (editingUser?.role?._id || "null")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">No Role</SelectItem>
                        {roles.map((role) => (
                          <SelectItem key={role._id} value={role._id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.roleId && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.roleId.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isCreating ? 'Creating...' : 'Updating...'}
                        </>
                      ) : (
                        isCreating ? 'Create User' : 'Update User'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (isCreating) {
                          setIsCreating(false);
                        } else {
                          cancelEdit();
                        }
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}