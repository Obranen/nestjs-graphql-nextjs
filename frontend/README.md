# Next.js GraphQL Frontend

Frontend на Next.js з GraphQL API, TanStack Query та TypeScript.

## Стек технологій

- **Next.js 16** — React фреймворк з App Router
- **GraphQL** — API комунікація з backend
- **TanStack Query v5** — управління серверним станом
- **TypeScript** — типізація
- **Tailwind CSS v4** — стилізація
- **shadcn/ui** — UI компоненти

## Встановлення

```bash
pnpm install
```

## Запуск

### 1. Генерація GraphQL типів

Перед запуском frontend переконайтеся, що backend запущено на `http://localhost:4000/graphql`, та згенеруйте типи:

```bash
pnpm codegen
```

Або в режимі спостереження (автоматичне оновлення при зміні запитів):

```bash
pnpm codegen:watch
```

### 2. Запуск dev-сервера

```bash
pnpm dev
```

Frontend буде доступний за адресою: **http://localhost:3000**

## Скрипти

| Команда | Опис |
|---------|------|
| `pnpm dev` | Запуск dev-сервера з авто-оновленням |
| `pnpm build` | Збірка для production |
| `pnpm start` | Запуск production-сервера |
| `pnpm codegen` | Генерація GraphQL типів та React Query хуків |
| `pnpm codegen:watch` | Генерація в режимі спостереження |

## Структура проекту

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css         # Глобальні стилі
│   ├── layout.tsx          # Кореневий layout
│   ├── page.tsx            # Головна сторінка
│   └── product/            # Продукти
├── components/             # React компоненти
├── lib/
│   ├── __generated__/      # Автозгенеровані GraphQL типи (не комітити)
│   ├── fetcher.ts          # GraphQL fetcher
│   └── providers.tsx       # Postgres providers (QueryClient)
├── codegen.ts              # GraphQL Codegen конфігурація
└── package.json
```

## GraphQL Codegen

Codegen автоматично генерує:
- TypeScript типи для GraphQL операцій
- React Query хуки для запитів та мутацій
- Типізовані функції fetcher

Приклад використання згенерованого хуку:

```tsx
import { useGetAllUsersQuery } from '@/lib/__generated__/graphql'

function MyComponent() {
  const { data, isLoading, error } = useGetAllUsersQuery()
  
  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Помилка: {error.message}</div>
  
  return <div>{data?.users.map(u => <div key={u.id}>{u.name}</div>)}</div>
}
```

## Залежності від Backend

Для роботи frontend необхідний запущений backend:

```bash
# У терміналі 1 - запустити backend
cd ../backend
pnpm start:dev
```

Backend має бути доступний за адресою: **http://localhost:4000/graphql**

## Вирішення проблем

### Помилка генерації GraphQL типів

Якщо `pnpm codegen` видає помилку:
1. Переконайтеся, що backend запущено
2. Перевірте, що GraphQL доступний за адресою `http://localhost:4000/graphql`
3. Запустіть `pnpm codegen` ще раз

### Помилка Tailwind CSS

Якщо стилі не застосовуються:
1. Видаліть `.next` папку: `rm -rf .next`
2. Перезапустіть dev-сервер: `pnpm dev`

## Ліцензія

MIT
