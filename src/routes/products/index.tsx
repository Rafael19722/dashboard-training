import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

type Product = {
  id: string
  title: string
  price: number
  category: string
  imageUrl: string
}

type PaginatedResponse = {
  data: Product[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

function ProductsPage() {
  const [page, setPage] = useState(1)
  const limit = 5

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<PaginatedResponse>
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <div className="border rounded-md p-4 bg-white">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading products: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products Inventory</h2>
        <Button>Add Product</Button>
      </div>

      <div className="border rounded-md bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.imageUrl} alt={product.title} className="h-10 w-10 object-contain" />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
                    <Button variant="ghost" size="icon">
                      <Eye size={16} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t bg-slate-50">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium">{data?.data.length}</span> of <span className="font-medium">
              {data?.meta.totalItems}</span> products
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </Button>

              <div className="text-sm font-medium mx-2">
                Page {data?.meta.currentPage} of {data?.meta.totalPages || 1}
              </div>

              <Button
                variant="out"
                size="sm"
                onClick={() => setPage((old) => old + 1)}
                disabled={page >= (data?.meta.totalPages || 1)}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
