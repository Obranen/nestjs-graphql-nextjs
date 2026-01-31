import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'

// Описываем, что мы хотим забрать
const getAllProducts = gql`
  query {
    products {
      id
      name
      price
    }
  }
`

interface Product {
  id: string
  name: string
  price: number
}

interface ProductsData {
  products: Product[]
}

export default async function Home() {
  // Выполняем запрос прямо на сервере!
  const { data } = await getClient().query<ProductsData>({
    query: getAllProducts,
  })

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Товары из БД:</h1>
      <>
        {data?.products?.map((product: Product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </>
    </main>
  )
}
