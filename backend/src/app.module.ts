import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { getGraphQLConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

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
      envFilePath: '../.env', // Путь к файлу .env
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
