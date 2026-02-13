import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // Проверь порт! На скрине у тебя NestJS запустился, 
  // обычно это http://localhost:3000/graphql или 8080/8800.
  schema: 'http://localhost:3000/graphql', 
  
  // 1. Ищем запросы в папке app и lib (у тебя они в корне frontend)
  documents: ['./app/**/*.tsx', './app/**/*.ts', './lib/**/*.ts'], 
  
  generates: {
    // 2. Генерируем в папку __generated__ в корне frontend
    './lib/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript-react-query'
      ],
      config: {
        fetcher: 'graphql-request',
        exposeQueryKeys: true,
        exposeFetcher: true
      }
    }
  },
  // 3. Чтобы он не падал, если пока не нашел ни одного запроса (query/mutation)
  ignoreNoDocuments: true
}

export default config