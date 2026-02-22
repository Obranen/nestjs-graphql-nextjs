# NestJS GraphQL Next.js Fullstack

Fullstack проект з NestJS (GraphQL) backend та Next.js frontend.

## 📋 Зміст

- [Стек технологій](#стек-технологій)
- [Структура проекту](#структура-проекту)
- [Швидкий старт](#швидкий-старт)
- [Backend](#backend)
- [Frontend](#frontend)
- [Розробка](#розробка)
- [Вирішення проблем](#вирішення-проблем)

## Стек технологій

### Backend
- **NestJS** — прогресивний Node.js фреймворк
- **GraphQL (Apollo)** — API з потужною системою типів
- **Prisma ORM** — сучасна ORM для роботи з БД
- **PostgreSQL** — реляційна база даних
- **Passport** — аутентифікація (JWT, Local)

### Frontend
- **Next.js 16** — React фреймворк з App Router
- **GraphQL** — API комунікація з backend
- **TanStack Query v5** — управління серверним станом
- **TypeScript** — типізація
- **Tailwind CSS v4** — стилізація
- **shadcn/ui** — UI компоненти

## Структура проекту

```
nestjs-graphql-nextjs/
├── backend/                 # NestJS GraphQL API
│   ├── src/
│   ├── prisma/
│   ├── generated/
│   ├── .env
│   └── docker-compose.yml
├── frontend/                # Next.js GraphQL Client
│   ├── app/
│   ├── components/
│   ├── lib/
│   │   └── __generated__/   # Автозгенеровані типи
│   └── codegen.ts
└── README.md
```

## Швидкий старт

### 1. Встановлення залежностей

```bash
# Встановлення залежностей backend
cd backend
pnpm install

# Встановлення залежностей frontend
cd ../frontend
pnpm install
```

### 2. Запуск бази даних (Docker)

```bash
cd backend
pnpm db:up
```

Це запустить:
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050`

### 3. Налаштування змінних оточення

Створіть файл `backend/.env`:

```env
# pgAdmin
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin

# PostgreSQL
NODE_ENV=development
POSTGRES_USER=ubuntu_postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nestjs_test

# Database URL
DATABASE_URL=postgresql://ubuntu_postgres:postgres@localhost:5432/nestjs_test?schema=public
```

### 4. Ініціалізація бази даних

```bash
cd backend

# Генерація Prisma Client
pnpm prisma:generate

# Створення та застосування міграцій
pnpm prisma:migrate

# Заповнення БД тестовими даними
pnpm db:seed
```

### 5. Запуск Backend

```bash
cd backend
pnpm start:dev
```

Backend доступний за адресою: **http://localhost:4000/graphql**

### 6. Запуск Frontend

В окремому терміналі:

```bash
cd frontend

# Генерація GraphQL типів (обов'язково!)
pnpm codegen

# Запуск dev-сервера
pnpm dev
```

Frontend доступний за адресою: **http://localhost:3000**

## Backend

### Основні команди

```bash
cd backend

# Docker
pnpm db:up          # Запуск PostgreSQL та pgAdmin
pnpm db:stop        # Зупинка контейнерів
pnpm db:down        # Зупинка та видалення контейнерів

# Prisma
pnpm prisma:generate        # Генерація Prisma Client
pnpm prisma:migrate         # Створення та застосування міграцій
pnpm prisma:migrate:deploy  # Застосування міграцій (production)
pnpm prisma:migrate:reset   # Повний скид БД
pnpm prisma:seed            # Заповнення БД тестовими даними
pnpm prisma:studio          # Відкрити Prisma Studio (GUI)

# Розробка
pnpm start:dev      # Запуск з авто-перезагрузкою
pnpm build          # Збірка проекту
pnpm start          # Запуск production-версії
```

### GraphQL API

Після запуску backend GraphQL доступний за адресою:

- **GraphQL Endpoint**: `http://localhost:4000/graphql`
- **Playground**: відкривається автоматично в браузері

Приклад запиту:

```graphql
query {
  products {
    id
    name
    price
    category
    status
  }
}
```

## Frontend

### Основні команди

```bash
cd frontend

# Розробка
pnpm dev              # Запуск dev-сервера (http://localhost:3000)
pnpm codegen          # Генерація GraphQL типів
pnpm codegen:watch    # Генерація в режимі спостереження

# Production
pnpm build            # Збірка для production
pnpm start            # Запуск production-сервера
```

### Структура GraphQL Codegen

Codegen генерує в `lib/__generated__/graphql.ts`:
- TypeScript типи для GraphQL операцій
- React Query хуки для запитів та мутацій
- Типізовані функції fetcher

Приклад використання:

```tsx
import { useGetAllUsersQuery } from '@/lib/__generated__/graphql'

function MyComponent() {
  const { data, isLoading, error } = useGetAllUsersQuery()
  
  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Помилка: {error.message}</div>
  
  return <div>{data?.users.map(u => <div key={u.id}>{u.name}</div>)}</div>
}
```

## Розробка

### Рекомендований робочий процес

1. **Запустіть базу даних**: `pnpm db:up` (backend)
2. **Запустіть backend**: `pnpm start:dev` (backend)
3. **Запустіть frontend**: `pnpm dev` (frontend)
4. **Генерація типів**: `pnpm codegen:watch` (frontend, опціонально)

### Порти сервісів

| Сервіс | Порт | Адреса |
|--------|------|--------|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| Backend (NestJS + GraphQL) | 4000 | http://localhost:4000/graphql |
| PostgreSQL | 5432 | localhost:5432 |
| pgAdmin | 5050 | http://localhost:5050 |

## Вирішення проблем

### Frontend не бачить GraphQL схему

```bash
# Переконайтеся, що backend запущено
curl http://localhost:4000/graphql -H "Content-Type: application/json" -d '{"query":"{ __typename }"}'

# Перезапустіть codegen
cd frontend
pnpm codegen
```

### Помилка Tailwind CSS

```bash
# Видаліть кеш Next.js
rm -rf frontend/.next

# Перезапустіть dev-сервер
cd frontend
pnpm dev
```

### Помилка підключення до БД

```bash
# Перевірте, що Docker контейнери запущені
docker ps

# Перезапустіть базу даних
cd backend
pnpm db:down
pnpm db:up

# Перезапустіть міграції
pnpm prisma:migrate:reset
pnpm db:seed
```

### Codegen видає помилку

1. Переконайтеся, що backend запущено на порту 4000
2. Перевірте доступність GraphQL: `http://localhost:4000/graphql`
3. Запустіть codegen ще раз: `pnpm codegen`

### Конфлікт портів

Якщо порт 3000 або 4000 зайнятий:

```bash
# Звільнити порт 3000
lsof -ti:3000 | xargs kill -9

# Звільнити порт 4000
lsof -ti:4000 | xargs kill -9
```

## Тестові дані

Після виконання `pnpm db:seed` у БД з'являться:

**Користувачі (3):**
- `vendor1@example.com` — Tech Vendor Inc
- `vendor2@example.com` — Fashion House
- `admin@example.com` — Admin User

**Продукти (13):** електроніка, одяг, аксесуари

## Ліцензія

MIT
