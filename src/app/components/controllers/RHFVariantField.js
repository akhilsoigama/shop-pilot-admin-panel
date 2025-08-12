'use client';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const RHFVariantField = ({
  name,
  control,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...props}
          type={type}
          className={cn(
            'w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100',
            className,
            error && 'border-red-500 focus-visible:ring-red-500'
          )}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
        />
      )}
    />
  );
};

export default RHFVariantField;