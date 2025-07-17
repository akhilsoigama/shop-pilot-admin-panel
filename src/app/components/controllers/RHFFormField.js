'use client';
import { Controller } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const RHFFormField = ({
  name,
  control,
  label,
  helperText,
  startIcon,
  endIcon,
  multiline = false,
  rows = 3,
  className,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className={cn('mb-4 w-full space-y-2', className)}>
          {label && <Label htmlFor={name}>{label}</Label>}
          
          <div className="relative">
            {startIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {startIcon}
              </div>
            )}
            
            {multiline ? (
              <Textarea
                {...field}
                id={name}
                rows={rows}
                className={cn(
                  'w-full',
                  startIcon && 'pl-10',
                  endIcon && 'pr-10',
                  error && 'border-red-500 focus-visible:ring-red-500'
                )}
                {...rest}
              />
            ) : (
              <Input
                {...field}
                id={name}
                className={cn(
                  'w-full',
                  startIcon && 'pl-10',
                  endIcon && 'pr-10',
                  error && 'border-red-500 focus-visible:ring-red-500'
                )}
                {...rest}
              />
            )}
            
            {endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {endIcon}
              </div>
            )}
          </div>
          
          {(error || helperText) && (
            <p className={cn(
              'text-sm',
              error ? 'text-red-500' : 'text-muted-foreground'
            )}>
              {error ? error.message : helperText}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFFormField;