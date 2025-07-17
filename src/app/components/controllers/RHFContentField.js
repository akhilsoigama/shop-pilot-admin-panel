'use client';
import { Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { FieldError } from 'react-hook-form';



const RFFTiptapEditor = dynamic(() => import('./RHFTipTap'), { 
  ssr: false,
  loading: () => <Typography>Loading editor...</Typography>
});

const RHFContentField = ({ name, control, errors, label }) => {
  return (
    <Box mb={5}>
      {label && (
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label || 'This field'} is required` }}
        render={({ field }) => (
          <Box>
            <RFFTiptapEditor
              value={field.value || ''}
              onChange={(html) => field.onChange(html)}  
            />
          </Box>
        )}
      />

      {errors?.[name] && (
        <Typography color="error" variant="caption">
          {errors[name]?.message}
        </Typography>
      )}
    </Box>
  );
};

export default RHFContentField;