import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql';

export const customFetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    const client = new GraphQLClient(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        // Оставляем эти заголовки на всякий случай, 
        // хотя на бэкенде мы их уже разрешили
        'apollo-require-preflight': 'true',
      },
    });

    // Важно: передаем query и variables именно так
    return await client.request(query, variables as any);
  };
};