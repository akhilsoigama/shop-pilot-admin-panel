'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLogin } from '@/hooks/useLogin';
import RHFFormField from '@/app/components/controllers/RHFFormField';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    form: { control, handleSubmit, formState: { errors } },
    showPassword,
    togglePasswordVisibility,
    isSubmitting,
    onSubmit
  } = useLogin();

  useEffect(() => {
    setIsMounted(true);
    const token = Cookies.get('token');
    if (token) {
      router.replace('/dashboard/overview');
    }
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Main container */}
      <motion.div 
        className="w-full max-w-6xl flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl bg-background"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary/90 p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white mix-blend-overlay"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full text-primary-foreground">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="bg-background/20 p-2 rounded-lg backdrop-blur-sm border border-background/10">
                  <Image
                    src="/logo.png"
                    alt="Company Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    priority
                  />
                </div>
                <span className="text-xl font-bold tracking-tight">YourBrand</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Welcome back!</h2>
                <p className="text-primary-foreground/80 mb-8">
                  Streamline your workflow with our powerful admin dashboard.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 bg-background/10 p-4 rounded-lg backdrop-blur-sm border border-background/10"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <Avatar key={i} className="h-10 w-10 border-2 border-background">
                    <AvatarFallback className="bg-primary/80 text-primary-foreground">
                      U{i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">Join 10,000+ admins</p>
                <p className="text-xs text-primary-foreground/70">Trusted by top companies</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <motion.div 
          className="flex-1 bg-background/95 backdrop-blur-sm p-8 lg:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="max-w-md mx-auto h-full flex flex-col justify-center">
            {/* Mobile logo */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="lg:hidden flex justify-center mb-8"
            >
              <div className="bg-primary/10 p-3 rounded-full backdrop-blur-sm border border-border">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={64}
                  height={64}
                  className="rounded-lg"
                  priority
                />
              </div>
            </motion.div>

            <CardHeader className="text-center p-0 mb-8">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your admin dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <RHFFormField
                    name="email"
                    control={control}
                    placeholder="admin@example.com"
                    error={errors.email}
                    startIcon={<Mail className="h-4 w-4 text-muted-foreground" />}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">Password</Label>
                  <RHFFormField
                    name="password"
                    control={control}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    error={errors.password}
                    startIcon={<Lock className="h-4 w-4 text-muted-foreground" />}
                    endIcon={
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    className="pl-10"
                  />
                </div>

                <div className=" pl-10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-medium leading-none">
                      Remember me
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm h-auto px-0 text-muted-foreground hover:text-primary"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="ml-10 mt-2"
                  disabled={isSubmitting}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Authenticating...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="login"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        {isHovered ? 'Access Dashboard →' : 'Login to Dashboard'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm h-auto px-0 text-primary hover:text-primary/80"
                    onClick={() => router.push('/register')}
                  >
                    Request access
                  </Button>
                </p>
              </div>
            </CardContent>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}