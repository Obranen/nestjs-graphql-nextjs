'use client'

import { useQuery } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:3000/graphql'

const client = new GraphQLClient(endpoint)

const getUsersQuery = `
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

async function fetchUsers(): Promise<UsersData> {
  return client.request<UsersData>(getUsersQuery)
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) {
    return (
      <main className='p-10'>
        <h1 className='text-2xl font-bold mb-4'>Загрузка...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className='p-10'>
        <h1 className='text-2xl font-bold mb-4 text-red-500'>Ошибка: {error.message}</h1>
      </main>
    )
  }

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Пользователи из БД:</h1>
      {data?.users?.length === 0 ? (
        <p>Пользователей нет</p>
      ) : (
        <div className='space-y-4'>
          {data?.users?.map((user: User) => (
            <div key={user.id} className='border p-4 rounded'>
              <p className='font-medium'>{user.name}</p>
              <p className='text-gray-600'>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
