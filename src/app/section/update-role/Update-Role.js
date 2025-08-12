'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { permissionMatrix } from '@/lib/permission';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleSchema } from '@/lib/validations/roleSchema';
import { ChevronDown, ChevronUp, Edit2, Trash2, Plus, X, Check, MoreVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import RHFCheckboxField from '@/app/components/controllers/RHFCheckboxField';

export default function RoleListPage() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, roleId: null });
    const [expandedRoles, setExpandedRoles] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    const {
        control,
        setValue,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: '',
            permissions: [],
        },
    });

    const { name, permissions } = watch();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/admin/role', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRoles(res.data);
        } catch (error) {
            toast.error('Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (role) => {
        setEditing(role._id);
        reset({
            name: role.name,
            permissions: role.permissions || [],
        });
    };

    const cancelEdit = () => {
        setEditing(null);
        reset({ name: '', permissions: [] });
        setExpandedRoles({});
    };

    const togglePermission = (key) => {
        const currentPermissions = permissions || [];
        const updated = currentPermissions.includes(key)
            ? currentPermissions.filter((p) => p !== key)
            : [...currentPermissions, key];
        setValue('permissions', updated, { shouldValidate: true });
    };

    const toggleAllForEntity = (entityKeys) => {
        const allKeys = Object.values(entityKeys);
        const currentPermissions = permissions || [];
        const hasAll = allKeys.every((key) => currentPermissions.includes(key));

        const updated = hasAll
            ? currentPermissions.filter((key) => !allKeys.includes(key))
            : [...new Set([...currentPermissions, ...allKeys])];

        setValue('permissions', updated, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.put(`/api/admin/role/${editing}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Role updated successfully');
            cancelEdit();
            fetchRoles();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to update role');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openDelete = (id) => setDeleteDialog({ open: true, roleId: id });
    const closeDelete = () => setDeleteDialog({ open: false, roleId: null });

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/admin/role/${deleteDialog.roleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Role deleted successfully');
            closeDelete();
            fetchRoles();
        } catch (error) {
            toast.error('Failed to delete role');
        }
    };

    const toggleExpand = (roleId) =>
        setExpandedRoles((prev) => ({ ...prev, [roleId]: !prev[roleId] }));

    const isAllChecked = (entityKeys) => {
        const allKeys = Object.values(entityKeys);
        return allKeys.every((key) => permissions?.includes(key));
    };

    const isAnyChecked = (entityKeys) => {
        const allKeys = Object.values(entityKeys);
        return allKeys.some((key) => permissions?.includes(key));
    };

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl font-bold">Role Management</CardTitle>
                                <CardDescription>Manage user roles and permissions</CardDescription>
                            </div>
                            <Button className="w-full sm:w-auto" size="sm" onClick={() => router.push('/dashboard/createRole')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Role
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full rounded-md" />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* DESKTOP TABLE */}
                                <div className="hidden md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px]">Role</TableHead>
                                                <TableHead>Permissions</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {roles.map((role) => (
                                                <TableRow key={role._id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium">{role.name}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1 max-w-[600px]">
                                                            {expandedRoles[role._id] ? (
                                                                <>
                                                                    {role.permissions?.map((perm) => (
                                                                        <Badge key={perm} variant="outline" className="text-xs">
                                                                            {perm}
                                                                        </Badge>
                                                                    ))}
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-6 px-2 text-xs"
                                                                        onClick={() => toggleExpand(role._id)}
                                                                    >
                                                                        <ChevronUp className="h-3 w-3 mr-1" />
                                                                        Collapse
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {role.permissions?.slice(0, 5).map((perm) => (
                                                                        <Badge key={perm} variant="outline" className="text-xs">
                                                                            {perm}
                                                                        </Badge>
                                                                    ))}
                                                                    {role.permissions?.length > 5 && (
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="h-6 px-2 text-xs"
                                                                                    onClick={() => toggleExpand(role._id)}
                                                                                >
                                                                                    +{role.permissions.length - 5} more
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                Click to view all permissions
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => startEdit(role)}
                                                            >
                                                                <Edit2 className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </Button>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="sm">
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem
                                                                        className="text-red-600 focus:text-red-600"
                                                                        onClick={() => openDelete(role._id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* MOBILE CARDS */}
                                <div className="md:hidden space-y-4">
                                    {roles.map((role) => (
                                        <Card key={role._id}>
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h3 className="font-medium">{role.name}</h3>
                                                        <div className="flex flex-wrap gap-1">
                                                            {expandedRoles[role._id] ? (
                                                                <>
                                                                    {role.permissions?.map((perm) => (
                                                                        <Badge key={perm} variant="outline" className="text-xs">
                                                                            {perm}
                                                                        </Badge>
                                                                    ))}
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-6 px-2 text-xs"
                                                                        onClick={() => toggleExpand(role._id)}
                                                                    >
                                                                        <ChevronUp className="h-3 w-3 mr-1" />
                                                                        Less
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {role.permissions?.slice(0, 3).map((perm) => (
                                                                        <Badge key={perm} variant="outline" className="text-xs">
                                                                            {perm}
                                                                        </Badge>
                                                                    ))}
                                                                    {role.permissions?.length > 3 && (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-6 px-2 text-xs"
                                                                            onClick={() => toggleExpand(role._id)}
                                                                        >
                                                                            +{role.permissions.length - 3} more
                                                                        </Button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => startEdit(role)}>
                                                                <Edit2 className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600"
                                                                onClick={() => openDelete(role._id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* EDIT FORM */}
                        <AnimatePresence>
                            {editing && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 overflow-hidden"
                                >
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Edit Role</CardTitle>
                                                <Button variant="ghost" size="sm" onClick={cancelEdit}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                                <Controller
                                                    name="name"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                Role Name
                                                            </label>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter role name"
                                                                error={errors.name?.message}
                                                            />
                                                            {errors.name && (
                                                                <p className="text-sm font-medium text-destructive">
                                                                    {errors.name.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                />

                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium">Permissions</h3>
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            type="button"
                                                            onClick={() => {
                                                                const allPerms = permissionMatrix.flatMap((entity) =>
                                                                    Object.values(entity.keys)
                                                                );
                                                                setValue(
                                                                    'permissions',
                                                                    permissions?.length === allPerms.length ? [] : allPerms,
                                                                    { shouldValidate: true }
                                                                );
                                                            }}
                                                        >
                                                            {permissions?.length ===
                                                                permissionMatrix.flatMap((entity) => Object.values(entity.keys))
                                                                    .length
                                                                ? 'Deselect All'
                                                                : 'Select All'}
                                                        </Button>
                                                    </div>

                                                    <div className="rounded-lg border overflow-hidden">
                                                        <Table>
                                                            <TableHeader className="bg-muted/50">
                                                                <TableRow>
                                                                    <TableHead className="w-[200px]">Entity</TableHead>
                                                                    <TableHead className="text-center">All</TableHead>
                                                                    <TableHead className="text-center">Create</TableHead>
                                                                    <TableHead className="text-center">Read</TableHead>
                                                                    <TableHead className="text-center">Update</TableHead>
                                                                    <TableHead className="text-center">Delete</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {permissionMatrix.map((entity) => {
                                                                    const entityKeys = entity.keys;
                                                                    const allChecked = isAllChecked(entityKeys);
                                                                    const anyChecked = isAnyChecked(entityKeys);

                                                                    return (
                                                                        <TableRow key={entity.name}>
                                                                            <TableCell className="font-medium">
                                                                                {entity.name}
                                                                            </TableCell>
                                                                            <TableCell className="text-center">
                                                                                <Checkbox
                                                                                    checked={allChecked}
                                                                                    indeterminate={!allChecked && anyChecked}
                                                                                    onCheckedChange={() => toggleAllForEntity(entityKeys)}
                                                                                />
                                                                            </TableCell>
                                                                            {['create', 'read', 'update', 'delete'].map((action) => {
                                                                                const key = entityKeys[action];
                                                                                const isChecked = permissions?.includes(key);

                                                                                return (
                                                                                    <TableCell key={key} className="text-center">
                                                                                        <Checkbox
                                                                                            checked={isChecked}
                                                                                            onCheckedChange={() => togglePermission(key)}
                                                                                        />
                                                                                    </TableCell>
                                                                                );
                                                                            })}
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button type="submit" disabled={isSubmitting}>
                                                        {isSubmitting ? (
                                                            <>
                                                                <svg
                                                                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <circle
                                                                        className="opacity-25"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="10"
                                                                        stroke="currentColor"
                                                                        strokeWidth="4"
                                                                    ></circle>
                                                                    <path
                                                                        className="opacity-75"
                                                                        fill="currentColor"
                                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                    ></path>
                                                                </svg>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Check className="h-4 w-4 mr-2" />
                                                                Save Changes
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={cancelEdit}
                                                        disabled={isSubmitting}
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
                    </CardContent>
                </Card>
            </motion.div>

            {/* DELETE DIALOG */}
            <Dialog open={deleteDialog.open} onOpenChange={closeDelete}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Role</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Are you sure you want to permanently delete this role?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDelete}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}