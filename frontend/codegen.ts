// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['./app/**/*.tsx', './app/**/*.ts'],
  generates: {
    './lib/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        reactQueryVersion: 5,
        fetcher: {
          endpoint: 'http://localhost:4000/graphql',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
        exposeQueryKeys: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
