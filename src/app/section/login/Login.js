'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'sonner';
import { useLogin } from '@/hooks/useLogin';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const {
    form: { control, handleSubmit, formState: { errors } },
    showPassword,
    togglePasswordVisibility,
    isSubmitting,
    onSubmit
  } = useLogin();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.replace('/dashboard/overview');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-2xl shadow-lg border dark:border-zinc-700">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="relative">
                <RHFFormField
                  name="email"
                  control={control}
                  placeholder="Email"
                  error={errors.email}
                  startIcon={<Email className="text-zinc-500" fontSize="small" />}
                />
              </div>

              <div className="relative">
                <RHFFormField
                  name="password"
                  control={control}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={errors.password}
                  startIcon={<Lock className="text-zinc-500" fontSize="small" />}
                  endIcon={
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-zinc-500 focus:outline-none"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </button>
                  }
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}