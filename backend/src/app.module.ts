import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Делает переменные доступными во всем приложении
      expandVariables: true, // ВКЛЮЧАЕТ dotenv-expand
    }),
  ],
  controllers: [AppController],
  providers: [AppService], // <-- Добавь сюда
})
export class AppModule {}
