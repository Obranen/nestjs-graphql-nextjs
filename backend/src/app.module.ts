import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { getGraphQLConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Делает переменные доступными во всем приложении
      expandVariables: true, // ВКЛЮЧАЕТ dotenv-expand
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
