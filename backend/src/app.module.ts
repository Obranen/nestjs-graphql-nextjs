import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Делает переменные доступными во всем приложении
      expandVariables: true, // ВКЛЮЧАЕТ dotenv-expand
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService], // <-- Добавь сюда
})
export class AppModule {}
