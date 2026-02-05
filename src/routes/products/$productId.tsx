import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { motion } from 'framer-motion'


export const Route = createFileRoute('/products/$productId')({
  component: ProductComponent
})

type Product = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

function ProductComponent() {
  const { productId } = Route.useParams()

  const numericId = Number(productId)

  const { addItem, items, removeItem} = useCartStore()

  const isFavorite = items.includes(numericId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
      if (!response.ok) {
        throw new Error("Network responso was not ok");
      }
      return response.json() as Promise<Product>
    },
  })

  const handleFavorite = () => {
    if (isFavorite) {
      removeItem(numericId)
    } else {
      addItem(numericId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="space-y-3 w-[400px]">
          <Skeleton className="h-[200px] w-full rounded-xl"/>
          <Skeleton className="h-4 w-[250px]"/>
          <Skeleton className="h-4 w-[200px]"/>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading product: {error.message}</div>
  }

  if (!data) return <div>Not found</div>

  return (
    <div className="p-4 max-w-2xl mx-auto">
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
          <CardTitle className="text-xl">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center bg-white p-4 rounded-md">
            <img src={data.image} alt={data.title} className="h-64 object-contain" />
          </div>

          <div className="flex justify-between items-center">
            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm capitalize font-medium">
              {data.category}
            </span> 
            <span className="text-2xl font-bold text-green-600">
              ${data.price.toFixed(2)}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleFavorite}
            className={isFavorite ? "text-red-500 hover:text-red-600 border-red-200 bg-red-50" : ""}
          >
            <motion.div
              animate={isFavorite ? {scale: [1, 1.5, 1] } : { scale: 1 }}
              tansition={{ duration: 0.4 }}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </motion.div>
          </Button>

          <p className="text-slate-600 leading-relaxed">
            {data.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}