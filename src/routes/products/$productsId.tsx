import { createFileRoute } from '@tanstack/react-router'

const fetchPost = async (id: string) => {
  return { title: `Produto Secreto ${id}`, preco: 100 }
}

export const Route = createFileRoute('/products/$productsId')({
  component: ProductComponent,
  loader: async ({ params }) => {
    return await fetchPost(params.productsId)
  },
})

function ProductComponent() {
  const { productsId } = Route.useParams()
  
  const dadosDoProduto = Route.useLoaderData()

  return (
    <div className="p-4">
      <h2>Vendo o produto ID: {productsId}</h2>
      
      <p>Nome carregado: {dadosDoProduto.title}</p>
    </div>
  )
}