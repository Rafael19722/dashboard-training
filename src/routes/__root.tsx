import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { LayoutDashboard, ShoppingCart, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {

    const items = useCartStore((state) => state.items)

    return (
        <div className="flex h-screen w-full bg-slate-100 font-sans antialiased">
            <aside className="w-64 border-r bg-white p-4 hidden md:flex flex-col">
                <div className="mb-8 flex items-center gap-2 font-bold text-xl px-2">
                    <div className="h-8 w-8 bg-black rounded-lg"></div>
                    InventoryApp
                </div>

                <nav className="flex flex-col gap-2">
                    <Link to="/" className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 [&.active]:bg-slate-100 [&.active]:font-bold text-sm">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link to="/products" className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 [&.active]:bg-slate-100 [&.active]:font-bold text-sm">
                        <ShoppingCart size={20} />
                        Products
                        {items.length > 0 && (
                            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                {items.length}
                            </span>
                        )}
                    </Link>

                    <div className="mt-auto">
                        <Button variant="ghost" className="w-full justify-start gap-2 ml-0">
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