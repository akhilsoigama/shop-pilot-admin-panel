'use client';

import { useUsers } from '@/hooks/useUsers';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@/lib/validations/userSchema';
import axios from 'axios';
import { Loader2, UserPlus, CheckCircle, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import RHFFormField from '@/app/components/controllers/RHFFormField';

export default function CreateUser() {
  const { createUser } = useUsers();
  const [roles, setRoles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

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
      name: '',
      mobile: '',
    },
  });

  useEffect(() => {
    axios
      .get('/api/admin/role')
      .then((r) => setRoles(r.data))
      .catch(() => toast.error('Failed to load roles'));
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log('User created:', data);
    try {
      const user = await createUser(data);
      toast.success('User created successfully');
      setCreatedUser(user);
      setIsSuccess(true);
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCreatedUser(null);
  };


  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <CardHeader >
                  <div className="flex items-center space-x-3">
                    <UserPlus className="h-6 w-6" />
                    <div>
                      <CardTitle>Create New User</CardTitle>
                      <CardDescription >
                        Add a new user to the system
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-3">
                      <RHFFormField
                        name="name"
                        control={control}
                        error={errors}
                        label="User Name"
                      />
                    </div>
                    <div className="space-y-3">
                      <RHFFormField
                        name="email"
                        control={control}
                        error={errors}
                        type="email"
                        label="Email"
                      />
                    </div>

                    <div className="space-y-3">
                      <RHFFormField
                        type="password"
                        label="Password"
                        name="password"
                        control={control}
                        error={errors}
                      />
                    </div>
                    <div className="space-y-3">
                      <RHFFormField
                        name="mobile"
                        control={control}
                        error={errors}
                        label="Mobile Number"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Role
                      </label>
                      <Select onValueChange={(val) => setValue('roleId', val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.roleId && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive"
                        >
                          {errors.roleId.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Create User
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <Button variant="ghost" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to users
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r p-2 from-green-500 to-green-600 ">
                  <div className="flex flex-col items-center space-y-3">
                    <CheckCircle className="h-12 w-12" />
                    <CardTitle>User Created Successfully!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-xl">
                        {createdUser?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-medium">
                      {createdUser?.email}
                    </div>
                    
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">
                        <Badge variant="default">Active</Badge>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Created At</p>
                      <p className="font-medium">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      onClick={handleReset}
                      className="w-full"
                      variant="outline"
                    >
                      Create Another User
                    </Button>
                    <Button
                      onClick={() => window.history.back()}
                      className="w-full"
                    >
                      Back to Users List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}