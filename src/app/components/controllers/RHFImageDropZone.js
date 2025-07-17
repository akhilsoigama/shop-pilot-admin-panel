import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import ImageDropZone from '../DropZone';

const RHFDropzoneField = ({
  control,
  name = 'image',
  label = 'Upload Image',
  helperText,
  rules = { required: 'Image is required' },
  defaultValue = null,
  errors,
}) => {
  return (
    <FormControl fullWidth error={Boolean(errors?.[name])} className="mb-6">
      <FormLabel className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </FormLabel>

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

      <FormHelperText className="text-xs mt-1">
        {errors?.[name]?.message || helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default RHFDropzoneField;
