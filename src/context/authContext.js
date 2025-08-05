'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = Cookies.get('user')
    const storedToken = Cookies.get('token')

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error("Failed to parse user from cookies:", error)
      }
    }
  }, [])

  const logout = () => {
    Cookies.remove('user')
    Cookies.remove('token')
    setUser(null)
    setToken(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
