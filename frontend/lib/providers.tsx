'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Создаем QueryClient внутри useState, чтобы он не сбрасывался при ререндерах
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Настройки по умолчанию, например:
        staleTime: 60 * 1000, 
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}