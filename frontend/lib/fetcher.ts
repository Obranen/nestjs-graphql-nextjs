import { GraphQLClient } from 'graphql-request';
import { print, DocumentNode } from 'graphql';

const endpoint = 'http://localhost:4000/graphql';

export const customFetcher = <TData, TVariables>(
  query: DocumentNode | string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    const client = new GraphQLClient(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Если query это DocumentNode, преобразуем в строку
    const queryString = typeof query === 'string' ? query : print(query);

    return await client.request<TData>(queryString, variables as any);
  };
};