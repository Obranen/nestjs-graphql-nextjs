# NestJS GraphQL Backend

Backend на NestJS з GraphQL API, Prisma ORM та PostgreSQL.

## Стек технологій

- **NestJS** — прогресивний Node.js фреймворк
- **GraphQL (Apollo)** — API з потужною системою типів
- **Prisma** — сучасна ORM для роботи з БД
- **PostgreSQL** — реляційна база даних
- **Passport** — аутентифікація (JWT, Local)

## Встановлення

```bash
pnpm install
```

## Налаштування бази даних

### 1. Запуск БД через Docker

```bash
pnpm db:up
```

Це запустить PostgreSQL та pgAdmin:
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050`

### 2. Налаштування змінних оточення

Створіть файл `.env` у директорії `backend/`:

```env
POSTGRES_USER=ubuntu_postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=strapi
DATABASE_URL=postgresql://ubuntu_postgres:postgres@localhost:5432/strapi?schema=public

PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin
```

### 3. Згенеруйте Prisma Client:

```bash
pnpm prisma:generate
```

### 4. Створіть та застосуйте міграції:

```bash
pnpm prisma:migrate
```

### 5. Заповніть БД тестовими даними:

```bash
pnpm db:seed
```

## Скрипти

### Робота з Docker

| Команда | Опис |
|---------|------|
| `pnpm db:up` | Запуск PostgreSQL та pgAdmin у Docker |
| `pnpm db:stop` | Зупинка Docker-контейнерів |
| `pnpm db:down` | Зупинка та видалення контейнерів |

### Розробка

| Команда | Опис |
|---------|------|
| `pnpm start:dev` | Запуск сервера розробки з авто-перезагрузкою |
| `pnpm prisma:studio` | Відкрити Prisma Studio (GUI для БД) |

### Збірка та запуск

| Команда | Опис |
|---------|------|
| `pnpm build` | Збірка проекту (TypeScript → JavaScript) |
| `pnpm start` | Запуск продакшн-сервера |

### Робота з базою даних

| Команда | Опис |
|---------|------|
| `pnpm prisma:generate` | Генерація Prisma Client на основі `schema.prisma` |
| `pnpm prisma:migrate` | Створення нової міграції та застосування до БД (dev) |
| `pnpm prisma:migrate:deploy` | Застосування всіх міграцій (production) |
| `pnpm prisma:migrate:reset` | Повний скид БД: видалення даних + застосування міграцій |
| `pnpm prisma:seed` | Заповнення БД тестовими даними з `prisma/seed.ts` |
| `pnpm db:seed` | Аліас для `pnpm prisma:seed` |
| `pnpm db:reset` | Скид БД + заповнення тестовими даними |

## GraphQL API

Після запуску сервера (`pnpm start:dev`) GraphQL доступний за адресою:

- **GraphQL Endpoint**: `http://localhost:3000/graphql`
- **Playground**: відкривається автоматично в браузері

### Основні запити

```graphql
# Отримати всі продукти
query {
  products {
    id
    name
    price
    category
    status
  }
}

# Отримати продукт по ID
query {
  product(id: "some-id") {
    id
    name
    description
    price
    images
    tags
  }
}

# Отримати продукт по slug
query {
  productBySlug(slug: "wireless-headphones-pro") {
    id
    name
    description
    price
    stock
    vendor {
      name
      email
    }
  }
}

# Отримати продукти по категорії
query {
  productsByCategory(category: "Electronics") {
    id
    name
    price
  }
}

# Отримати популярні продукти
query {
  featuredProducts {
    id
    name
    price
    rating
  }
}
```

### Мутації

```graphql
# Створити продукт
mutation {
  createProduct(input: {
    name: "New Product"
    slug: "new-product"
    sku: "NP-001"
    price: 99.99
    category: "Electronics"
    status: "ACTIVE"
    stock: 100
  }) {
    id
    name
    slug
  }
}

# Оновити продукт
mutation {
  updateProduct(
    id: "product-id"
    input: {
      price: 79.99
      stock: 50
    }
  ) {
    id
    price
    stock
  }
}

# Видалити продукт
mutation {
  deleteProduct(id: "product-id") {
    id
  }
}
```

## Структура проекту

```
backend/
├── prisma/
│   ├── schema.prisma      # Схема БД
│   ├── seed.ts            # Скрипт заповнення БД
│   └── migrations/        # Міграції БД
├── src/
│   ├── auth/              # Модуль аутентифікації
│   ├── config/            # Конфігурація (GraphQL, env)
│   ├── prisma/            # Prisma сервіс
│   ├── product/           # Product модуль (GraphQL)
│   ├── users/             # Users модуль (GraphQL)
│   └── app.module.ts      # Головний модуль
├── generated/
│   └── prisma/            # Згенерований Prisma Client
├── .env                   # Змінні оточення
└── package.json
```

## Моделі даних

### User

```prisma
model User {
  id        String    @id @default(ulid())
  email     String    @unique
  name      String
  bio       String?
  role      String    @default("USER")
  products  Product[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Product

```prisma
model Product {
  id          String   @id @default(ulid())
  name        String
  description String?
  slug        String   @unique
  sku         String   @unique
  price       Decimal  @db.Decimal(10, 2)
  currency    String   @default("USD")
  stock       Int      @default(0)
  category    String?
  tags        String[]
  images      String[]
  weight      Float?
  dimensions  Json?
  status      String   @default("DRAFT")
  isFeatured  Boolean  @default(false)
  rating      Float    @default(0)
  reviewCount Int      @default(0)
  vendorId    String?
  vendor      User?    @relation(fields: [vendorId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Тестові дані

Після виконання `pnpm db:seed` у БД з'являться:

**Користувачі (3):**
- `vendor1@example.com` — Tech Vendor Inc (продавець електроніки)
- `vendor2@example.com` — Fashion House (продавець одягу)
- `admin@example.com` — Admin User (адміністратор)

**Продукти (13):**
- 5 продуктів електроніки (навушники, смарт-годинник, хаб, клавіатура, веб-камера)
- 3 продукти одягу (куртка, джинси, футболки)
- 3 аксесуари (окуляри, ремінь, рюкзак)
- 1 чернетка (не опубліковано)

## Ліцензія

MIT
