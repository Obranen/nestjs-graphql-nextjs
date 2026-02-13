// import type { CodegenConfig } from '@graphql-codegen/cli'

// const config: CodegenConfig = {
//   // Проверь порт! На скрине у тебя NestJS запустился, 
//   // обычно это http://localhost:3000/graphql или 8080/8800.
//   schema: 'http://localhost:3000/graphql', 
  
//   // 1. Ищем запросы в папке app и lib (у тебя они в корне frontend)
//   documents: ['./app/**/*.tsx', './app/**/*.ts', './lib/**/*.ts'], 
  
//   generates: {
//     // 2. Генерируем в папку __generated__ в корне frontend
//     './lib/__generated__/': {
//       preset: 'client',
//       plugins: [
//         'typescript-react-query'
//       ],
//       config: {
//         fetcher: 'custom-fetch ./lib/fetcher.ts#graphqlFetcher',
//         exposeQueryKeys: true,
//         exposeFetcher: true,
//         rawRequest: false
//       }
//     }
//   },
//   // 3. Чтобы он не падал, если пока не нашел ни одного запроса (query/mutation)
//   ignoreNoDocuments: true
// }

// export default config

// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: ['./app/**/*.tsx', './app/**/*.ts'],
  generates: {
    './lib/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        // ОБЯЗАТЕЛЬНО для TanStack Query v5
        reactQueryVersion: 5, 
        fetcher: {
          endpoint: 'http://localhost:3000/graphql',
          func: '@/lib/fetcher#customFetcher',
          isNode: false,
        },
        exposeQueryKeys: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;