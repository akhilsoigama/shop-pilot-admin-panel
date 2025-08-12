'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoles } from '@/hooks/useRoles';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import { permissionMatrix } from '@/lib/permission';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { roleSchema } from '@/lib/validations/roleSchema';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Loader2, Check, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CreateRoleForm() {
  const token = Cookies.get('token');
  const { createRole } = useRoles(token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      permissions: [],
    },
  });

  const selectedPermissions = watch('permissions') || [];

  const togglePermission = (key) => {
    const newPermissions = selectedPermissions.includes(key)
      ? selectedPermissions.filter((k) => k !== key)
      : [...selectedPermissions, key];
    setValue('permissions', newPermissions, { shouldValidate: true });
  };

  const toggleAll = (entityKeys) => {
    const entityPermissions = Object.values(entityKeys);
    const allExist = entityPermissions.every(perm => 
      selectedPermissions.includes(perm)
    );

    const newPermissions = allExist
      ? selectedPermissions.filter(perm => !entityPermissions.includes(perm))
      : [...new Set([...selectedPermissions, ...entityPermissions])];
    
    setValue('permissions', newPermissions, { shouldValidate: true });
  };

  const toggleAllPermissions = () => {
    const allPerms = permissionMatrix.flatMap(entity => Object.values(entity.keys));
    const newPermissions = selectedPermissions.length === allPerms.length 
      ? [] 
      : allPerms;
    setValue('permissions', newPermissions, { shouldValidate: true });
  };

  const isChecked = (key) => selectedPermissions.includes(key);
  const isAllChecked = (keys) => Object.values(keys).every((key) => isChecked(key));
  const isAnyChecked = (keys) => Object.values(keys).some((key) => isChecked(key));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createRole(data);
      toast.success('Role created successfully', {
        position: 'top-center',
        duration: 2000,
      });
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to create role', {
        position: 'top-center',
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Role</CardTitle>
          <CardDescription>
            Define a new role and assign permissions to it
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <RHFFormField
              name="name"
              label="Role Name"
              control={control}
              error={errors.name}
              placeholder="Enter role name (e.g. Admin, Manager)"
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Permissions</h3>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={toggleAllPermissions}
                >
                  {selectedPermissions.length === permissionMatrix.flatMap(entity => Object.values(entity.keys)).length
                    ? 'Deselect All'
                    : 'Select All'}
                </Button>
              </div>

              <div className="rounded-lg border overflow-hidden dark:border-zinc-700">
                <Table>
                  <TableHeader className="bg-zinc-100 dark:bg-zinc-800">
                    <TableRow>
                      <TableHead className="w-[200px]">Entity</TableHead>
                      <TableHead className="text-center">All</TableHead>
                      {['create', 'read', 'update', 'delete'].map((action) => (
                        <TableHead key={action} className="text-center capitalize">
                          {action}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionMatrix.map((entity) => (
                      <TableRow key={entity.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <TableCell className="font-medium dark:text-white">
                          {entity.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={isAllChecked(entity.keys)}
                            onCheckedChange={() => toggleAll(entity.keys)}
                            indeterminate={
                              isAnyChecked(entity.keys) && !isAllChecked(entity.keys)
                                ? true
                                : undefined
                            }
                          />
                        </TableCell>
                        {['create', 'read', 'update', 'delete'].map((action) => {
                          const key = entity.keys[action];
                          return (
                            <TableCell key={key} className="text-center">
                              <Checkbox
                                checked={isChecked(key)}
                                onCheckedChange={() => togglePermission(key)}
                              />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={!isDirty || isSubmitting}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}