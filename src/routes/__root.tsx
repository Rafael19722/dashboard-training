import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { LayoutDashboard, ShoppingCart, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="flex h-screen w-full bg-slate-50">
            <aside className="w-64 border-r bg-white p-4 hidden md:flex flex-col">
                <div className="mb-8 flex items-center gap-2 font-bold text-xl px-2">
                    <div className="h-8 w-8 bg-black rounded-lg"></div>
                    InventoryApp
                </div>

                <nav className="flex flex-col gap-2">
                    <Link to="/" className="links-nav">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link to="/products" className="links-nav">
                        <ShoppingCart size={20} />
                        Products
                    </Link>

                    <div className="mt-auto">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Settings size={20} />
                            Settings
                        </Button>
                    </div>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-14 border-b bg-white flex items-center px-6 justify-between">
                    <h2 className="font-semibold text-sm text-slate-500">Welcome back, Developer</h2>
                    <div className="h-8 w-8 rounded-full bg-slate-200"></div>
                </header>

                <div className="flex-1 overflow-auto p-6">
                    <Outlet />
                </div>
            </main>

            <TanStackRouterDevtools />
        </div>
    )
}