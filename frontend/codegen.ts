import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // 1. Укажи путь к твоему запущенному NestJS серверу
  schema: 'http://localhost:3000/graphql',
  // 2. Где лежат твои .graphql файлы или gql запросы на фронтенде
  documents: ['./lib/**/*.tsx', './lib/**/*.ts', '!./lib/__generated__/'],
  generates: {
    // 3. Куда положить сгенерированный код
    './lib/__generated__/': {
      preset: 'client',
      plugins: [
        // Этот плагин создаст готовые хуки для TanStack Query
        'typescript-react-query',
      ],
      config: {
        // Указываем, что используем fetcher через graphql-request
        fetcher: 'graphql-request',
        exposeQueryKeys: true,
        exposeFetcher: true,
      },
    },
  },
}

export default config
