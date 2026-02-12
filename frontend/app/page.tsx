import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'

// Описываем, что мы хотим забрать
const getAllProducts = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

interface User {
  id: string
  name: string
  email: string
}

interface UsersData {
  users: User[]
}

export default async function Home() {
  // Выполняем запрос прямо на сервере!
  const { data } = await getClient().query<UsersData>({
    query: getAllProducts,
  })

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Товары из БД:</h1>
      <>
        {data?.users?.map((user: User) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </>
    </main>
  )
}
