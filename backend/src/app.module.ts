import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from './prisma/prisma.module'
import { getGraphQLConfig } from './config/graphql.config'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Делает переменные доступными во всем приложении
      expandVariables: true, // ВКЛЮЧАЕТ dotenv-expand
    }),
    PrismaModule,
  ],
})
export class AppModule {}
