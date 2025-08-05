'use client'

import { useEffect, useState } from "react"

export default function usePermission(permissionName) {
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) return

    const user = JSON.parse(userStr)
    const permissions = user?.role?.permissions || []

    const match = permissions.some(p => p.name === permissionName)
    setHasPermission(match)
  }, [permissionName])

  return hasPermission
}
