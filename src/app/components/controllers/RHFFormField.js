// components/form/RHFFormField.js
import { Controller } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';

const RHFFormField = ({
  name,
  control,
  label,
  helperText,
  startIcon,
  endIcon,
  multiline = false,
  rows = 3,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4 w-full">
          <TextField
            {...field}
            label={label}
            fullWidth
            multiline={multiline}
            rows={multiline ? rows : undefined}
            error={!!error}
            helperText={error ? error.message : helperText}
            className="rounded-md"
            InputProps={{
              className: 'bg-white dark:bg-gray-900 rounded-md transition-shadow focus-within:shadow-md',
              startAdornment: startIcon ? (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ) : null,
              endAdornment: endIcon ? (
                <InputAdornment position="end">{endIcon}</InputAdornment>
              ) : null,
            }}
            {...rest}
          />
        </div>
      )}
    />
  );
};

export default RHFFormField;
