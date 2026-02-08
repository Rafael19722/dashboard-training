import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleLogin = () => {
    login('DevSeniors')
    navigate({ to: '/' })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Login Fake</h1>
            <Button onClick={handleLogin}>Login on System</Button>
        </div>
    </div>
  )
}
