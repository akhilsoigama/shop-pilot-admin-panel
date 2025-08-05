'use client';

import { useUsers } from '@/hooks/useUsers';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Typography } from '@mui/material';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@/lib/validations/userSchema';
import axios from 'axios';
import RHFFormField from '@/app/components/controllers/RHFFormField';

export default function CreateUser() {
  const { createUser } = useUsers();
  const [roles, setRoles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      roleId: '',
    },
  });

  useEffect(() => {
    setIsMounted(true);
    axios
      .get('/api/admin/role')
      .then((r) => setRoles(r.data))
      .catch(() => toast.error('Failed to load roles'));
  }, []);

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      toast.success('User created successfully');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create user');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-8 sm:px-6 md:px-10 max-w-3xl mx-auto"
    >
      <Card className="rounded-lg shadow-md bg-white dark:bg-[#171717]">
        <CardContent className="p-6 space-y-6">
          <Typography variant="h5" className="text-gray-900 dark:text-gray-100">
            Create User
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RHFFormField
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="Enter email"
              error={errors.email}
              className="w-full"
            />

            <RHFFormField
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="Enter password"
              error={errors.password}
              className="w-full"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <Select onValueChange={(val) => setValue('roleId', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
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
            </div>

            <Button type="submit" className="w-full">
              Create User
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}