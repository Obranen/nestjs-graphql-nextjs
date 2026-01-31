import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // Сюда пишем адрес твоего NestJS (обычно порт 3000)
      uri: "http://localhost:3000/graphql",
    }),
  });
});