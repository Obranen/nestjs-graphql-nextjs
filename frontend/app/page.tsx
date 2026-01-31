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

export default async function Home() {
  // Выполняем запрос прямо на сервере!
  const { data } = await getClient().query({ query: getAllProducts })

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Пользователи из БД:</h1>
      data.products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))
    </main>
  )
}
