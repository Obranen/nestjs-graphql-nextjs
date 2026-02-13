import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

export function getGraphQLConfig(): Promise<ApolloDriverConfig> {
  const isDev = process.env.NODE_ENV === 'development'
  return Promise.resolve({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: isDev,
    csrfPrevention: false,
  })
}
