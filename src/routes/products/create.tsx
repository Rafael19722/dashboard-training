import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/products/create')({
  component: CreateProductPage,
})

function CreateProductPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const createMutation = useMutation({
        mutationFn: async (newProduct: any) => {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newProduct),
            })
            if (!response.ok) throw new Error('Failed to create product')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            navigate({ to: '/products' })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createMutation.mutate({
            title,
            price: parseFloat(price),
            category,
            imageUrl,
        })
    }

    return (
        <div className="p-4 max-w-2xl mx-auto space-y-6">
            <div className="mb-4">
                <Link to="/products">
                    <Button variant="outline" size="sm" className="gap-2">
                        <ArrowLeft size={16} />
                        Back to List
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Add new Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ex: Mouse" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Price ($)</Label>
                                <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Ex: electronics" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Image URL</Label>
                            <Input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required placeholder="https://..." />
                        </div>

                        {createMutation.isError && <p className="text-red-500 text-sm">Error creating product!</p>}

                        <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'Saving...' : 'Create Product'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
