'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { useTheme as useNextTheme } from 'next-themes';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState('');
  const { resolvedTheme } = useNextTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    axios
      .get('/api/admin/role', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((r) => setRoles(r.data))
      .catch(() => toast.error('Failed to load roles'));
  }, []);

  const createUser = async () => {
    try {
      await axios.post(
        '/api/admin/user',
        { email, password, roleId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      toast.success('User created');
      setEmail('');
      setPassword('');
      setRoleId('');
    } catch {
      toast.error('Could not create user');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`px-4 py-8 sm:px-6 md:px-10 max-w-3xl mx-auto`}
    >
      <Card
        className={`rounded-lg shadow-md ${
          isDark ? 'bg-[#171717]' : 'bg-white'
        } transition-colors duration-300`}
      >
        <CardContent className="p-6 space-y-6">
          <Typography variant="h5" className="text-gray-900 dark:text-gray-100">
            Create User
          </Typography>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />

            <Select value={roleId} onValueChange={(v) => setRoleId(v)}>
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

            <Button onClick={createUser} className="w-full">
              Create User
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
