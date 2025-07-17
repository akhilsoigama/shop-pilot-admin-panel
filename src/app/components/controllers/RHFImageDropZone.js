'use client'
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import ImageDropZone from '../common/RHFdropZone';

const RHFDropzoneField = ({
  control,
  name = 'image',
  helperText,
  rules = { required: 'Image is required' },
  defaultValue = null,
  errors,
}) => {
  return (
    <FormControl fullWidth error={Boolean(errors?.[name])} className="mb-6">

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <ImageDropZone
            value={field.value}
            onChange={field.onChange}
            className={`border-2 border-dashed rounded-lg p-4 transition duration-200 ${
              errors?.[name]
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
            }`}
          />
        )}
      />

      <FormHelperText className="text-xs mt-1 dark:text-gray-300">
        {errors?.[name]?.message || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default RHFDropzoneField;