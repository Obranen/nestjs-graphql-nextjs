'use client'

import { Button } from '@/components/ui/button'
import { useGetAllUsersQuery } from '@/lib/__generated__/graphql'

export default function Home() {
  const { data, isLoading, error } = useGetAllUsersQuery()

  if (isLoading) return <div className='p-10'>Загрузка...</div>
  if (error)
    return (
      <div className='p-10 text-red-500'>
        Ошибка: {(error as Error).message}
      </div>
    )

  const users = data?.users

  if (!users || users.length === 0) {
    return (
      <main className='p-10'>
        <h1 className='text-2xl font-bold mb-4'>Список пользователей</h1>
        <p className='text-gray-500'>Пользователи не найдены</p>
      </main>
    )
  }

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Список пользователей</h1>
      <ul className='space-y-2'>
        {users.map((user) => (
          <li key={user.id} className='p-4 border rounded shadow-sm'>
            <p className='font-semibold'>{user.name}</p>
            <p className='text-gray-600'>{user.email}</p>
            <p className='text-sm text-gray-400'>ID: {user.id}</p>
          </li>
        ))}
      </ul>
      <Button variant='default'>Новый пользователь</Button>
    </main>
  )
}
