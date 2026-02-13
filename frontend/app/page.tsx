'use client'

import { useGetAllUsersQuery } from '@/lib/__generated__/graphql';

export default function Home() {
  const { data, isLoading, error } = useGetAllUsersQuery();

  if (isLoading) return <div className="p-10">Загрузка...</div>;
  if (error) return <div className="p-10 text-red-500">Ошибка: {error.message}</div>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}