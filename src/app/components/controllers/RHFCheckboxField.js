'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox'; 
import { Label } from '@/components/ui/label';

const RHFCheckboxField = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(!!checked)}
          />
          <Label htmlFor={name} className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </Label>
        </div>
      )}
    />
  );
};

export default RHFCheckboxField;
