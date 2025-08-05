'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoles } from '@/hooks/useRoles';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import { permissionMatrix } from '@/lib/permission';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { roleSchema } from '@/lib/validations/roleSchema';

export default function CreateRoleForm() {
  const token = Cookies.get('token');
  const { createRole } = useRoles(token);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
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

  const isChecked = (key) => selectedPermissions.includes(key);
  const isAllChecked = (keys) => Object.values(keys).every((key) => isChecked(key));

  const onSubmit = async (data) => {
    try {
      await createRole(data);
      toast.success('Role created successfully');
      reset();
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to create role');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          <h2 className="text-2xl font-bold dark:text-white">Create Role</h2>

          <RHFFormField
            name="name"
            label="Role Name"
            control={control}
            error={errors.name}
          />

          <div className="overflow-auto border rounded dark:border-zinc-700">
            <table className="min-w-full text-sm dark:bg-zinc-900">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-left">
                <tr>
                  <th className="border p-2">Entity</th>
                  <th className="border p-2 text-center">All</th>
                  {['create', 'read', 'update', 'delete'].map((action) => (
                    <th key={action} className="border p-2 text-center capitalize">
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionMatrix.map((entity) => (
                  <tr key={entity.name} className="dark:bg-zinc-900">
                    <td className="border p-2 font-medium dark:text-white">
                      {entity.name}
                    </td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={isAllChecked(entity.keys)}
                        onChange={() => toggleAll(entity.keys)}
                        className="h-4 w-4"
                      />
                    </td>
                    {['create', 'read', 'update', 'delete'].map((action) => {
                      const key = entity.keys[action];
                      return (
                        <td key={key} className="border p-2 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked(key)}
                            onChange={() => togglePermission(key)}
                            className="h-4 w-4"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button onClick={handleSubmit(onSubmit)} className="w-full sm:w-auto">
            Create Role
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}