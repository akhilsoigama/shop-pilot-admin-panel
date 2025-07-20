'use client'

import { Stack, LinearProgress } from '@mui/material'

export default function GlobalLoading() {
    return (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="secondary" />
        </Stack>
    )
}
