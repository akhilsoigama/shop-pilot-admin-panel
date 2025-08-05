'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { permissionMatrix } from '@/lib/permission';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleSchema } from '@/lib/validations/roleSchema';

export default function RoleListPage() {
    const [roles, setRoles] = useState([]);
    const [editing, setEditing] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, roleId: null });
    const [expandedRoles, setExpandedRoles] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const res = await axios.get('/api/admin/role', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRoles(res.data);
        } catch (error) {
            toast.error('Failed to fetch roles');
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
            toast.success('Role updated successfully', {
                action: {
                    label: 'Dismiss',
                    onClick: () => { },
                },
            });
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

    return (
        <motion.div className="mx-auto max-w-screen-2xl px-2 pt-5 sm:px-4 md:px-6">
            <Card className="shadow-md">
                <CardContent>
                    <Typography variant="h5" className="mb-4">
                        Roles
                    </Typography>

                    {/* DESKTOP TABLE */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full border-collapse bg-white text-black dark:bg-black dark:text-white mb-6">
                            <thead className="bg-gray-100 dark:bg-[#171717]">
                                <tr>
                                    <th className="p-3 border text-left whitespace-nowrap">Name</th>
                                    <th className="p-3 border text-left">Permissions</th>
                                    <th className="p-3 border text-left whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => {
                                    const expanded = expandedRoles[role._id];
                                    const firstTwo = role.permissions?.slice(0, 2) || [];
                                    const hiddenCnt = (role.permissions?.length ?? 0) - 2;
                                    return (
                                        <tr key={role._id} className="bg-white dark:bg-[#171717]">
                                            <td className="p-3 border">{role.name}</td>
                                            <td className="p-3 border break-words">
                                                {expanded ? (
                                                    <>
                                                        {role.permissions.join(', ')}
                                                        <button
                                                            className="text-xs text-blue-500 ml-2"
                                                            onClick={() => toggleExpand(role._id)}
                                                        >
                                                            less
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {firstTwo.join(', ')}
                                                        {hiddenCnt > 0 && (
                                                            <button
                                                                className="text-xs text-blue-500 ml-2"
                                                                onClick={() => toggleExpand(role._id)}
                                                            >
                                                                +{hiddenCnt} more
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                            <td className="p-3 border space-x-2">
                                                <Button variant="secondary" onClick={() => startEdit(role)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" onClick={() => openDelete(role._id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE CARDS */}
                    <div className="sm:hidden space-y-4">
                        {roles.map((role) => {
                            const expanded = expandedRoles[role._id];
                            const firstTwo = role.permissions?.slice(0, 2) || [];
                            const hiddenCnt = (role.permissions?.length ?? 0) - 2;
                            return (
                                <Card key={role._id} className="bg-white dark:bg-[#171717] shadow-md">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <Typography variant="h6">{role.name}</Typography>
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="secondary" onClick={() => startEdit(role)}>
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => openDelete(role._id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-sm leading-relaxed">
                                            {expanded ? (
                                                <>
                                                    {role.permissions.join(', ')}
                                                    <button className="ml-1 text-blue-500" onClick={() => toggleExpand(role._id)}>
                                                        less
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {firstTwo.join(', ')}
                                                    {hiddenCnt > 0 && (
                                                        <button className="ml-1 text-blue-500" onClick={() => toggleExpand(role._id)}>
                                                            +{hiddenCnt} more
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* EDIT FORM */}
                    {editing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Card className="mb-6">
                                <CardContent>
                                    <Typography variant="h6" className="mb-3">
                                        Edit Role
                                    </Typography>

                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="mb-4">
                                                <Input
                                                    {...field}
                                                    className="w-full sm:max-w-sm"
                                                    placeholder="Role name"
                                                    error={errors.name ? errors.name.message : undefined}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                                )}
                                            </div>
                                        )}
                                    />

                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[640px] border-gray-700 border-collapse text-black dark:text-white bg-white dark:bg-black mb-4">
                                            <thead className="bg-gray-200 dark:bg-[#171717]">
                                                <tr>
                                                    <th className="p-2 border">Entity</th>
                                                    <th className="p-2 border">All</th>
                                                    {['create', 'read', 'update', 'delete'].map((act) => (
                                                        <th key={act} className="p-2 border capitalize">
                                                            {act}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissionMatrix.map((entity) => {
                                                    const entityKeys = entity.keys;
                                                    return (
                                                        <tr key={entity.name} className="bg-white dark:bg-[#171717]">
                                                            <td className="p-2 border">{entity.name}</td>
                                                            <td className="p-2 border text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isAllChecked(entityKeys)}
                                                                    onChange={() => toggleAllForEntity(entityKeys)}
                                                                    className="h-4 w-4"
                                                                />
                                                            </td>
                                                            {['create', 'read', 'update', 'delete'].map((action) => {
                                                                const key = entityKeys[action];
                                                                return (
                                                                    <td key={key} className="p-2 border text-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={permissions?.includes(key)}
                                                                            onChange={() => togglePermission(key)}
                                                                            className="h-4 w-4"
                                                                        />
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Updating...' : 'Update'}
                                        </Button>
                                        <Button variant="outline" onClick={cancelEdit}>
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </CardContent>
            </Card>

            {/* DELETE DIALOG */}
            <Dialog open={deleteDialog.open} onOpenChange={closeDelete}>
                <DialogContent className="bg-white text-black dark:bg-[#171717] dark:text-white rounded-md max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm mb-4">
                        Do you really want to delete this role? This action cannot be undone.
                    </div>
                    <DialogFooter className="flex gap-2 sm:justify-end">
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                        <Button variant="outline" onClick={closeDelete}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}