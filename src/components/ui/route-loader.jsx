'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Stack, LinearProgress } from '@mui/material'

export function RouteLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 700) // adjust timing as needed

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={0}>
        <LinearProgress color="secondary" />
      </Stack>
    </div>
  )
}
