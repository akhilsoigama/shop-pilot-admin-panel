'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Email, Lock } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.message || 'Login failed')

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            toast.success('Login successful')
            router.push('/dashboard/overview')
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.replace('/dashboard/overview')
        }
    }, [])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 p-4">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="rounded-2xl shadow-lg border dark:border-zinc-700">
                    <CardContent className="p-6 space-y-5">
                        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>

                        <div className="space-y-3">
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10"
                                />
                                <Email className="absolute left-3 top-2.5 text-zinc-500" fontSize="small" />
                            </div>

                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                />
                                <Lock className="absolute left-3 top-2.5 text-zinc-500" fontSize="small" />
                            </div>

                            <Button onClick={handleLogin} disabled={loading} className="w-full">
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
