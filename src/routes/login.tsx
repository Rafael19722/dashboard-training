import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const [email, setEmail] = useState('admin@loja.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid Credentials')
      }

      login('Admin')
      navigate({ to: '/products' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entering...' : 'Login on System'}
          </Button>
        </form>
      </div>
    </div>
  )
}
