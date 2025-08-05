'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { permissionMatrix } from '@/lib/permission';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function CreateRoleForm() {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const togglePermission = (key) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAllPermissionsForEntity = (entity) => {
    const allKeys = Object.values(entity.keys);
    const hasAll = allKeys.every((key) => selectedPermissions.includes(key));

    if (hasAll) {
      setSelectedPermissions((prev) => prev.filter((key) => !allKeys.includes(key)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...allKeys])]);
    }
  };

  const isAllChecked = (entity) => {
    const allKeys = Object.values(entity.keys);
    return allKeys.every((key) => selectedPermissions.includes(key));
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        '/api/admin/role',
        { name, permissions: selectedPermissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Role created');
      setName('');
      setSelectedPermissions([]);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[1400px] mx-auto mt-10 px-4"
    >
      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Create Role</h2>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Role Name"
            className="dark:bg-zinc-800 dark:text-white"
          />

          <div className="overflow-auto border rounded-md dark:border-zinc-700">
            <table className="min-w-full text-sm table-auto border-collapse dark:bg-zinc-900">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-left">
                <tr>
                  <th className="border p-2">Entity</th>
                  <th className="border p-2 text-center">All</th>
                  <th className="border p-2 text-center">Create</th>
                  <th className="border p-2 text-center">Read</th>
                  <th className="border p-2 text-center">Update</th>
                  <th className="border p-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {permissionMatrix.map((entity) => (
                  <tr key={entity.name} className="dark:bg-zinc-900">
                    <td className="border p-2 font-semibold dark:text-white">{entity.name}</td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={isAllChecked(entity)}
                        onChange={() => toggleAllPermissionsForEntity(entity)}
                      />
                    </td>
                    {['create', 'read', 'update', 'delete'].map((action) => {
                      const key = entity.keys[action];
                      return (
                        <td key={key} className="border p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(key)}
                            onChange={() => togglePermission(key)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!name || selectedPermissions.length === 0}
            className="w-full sm:w-auto"
          >
            Create Role
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
