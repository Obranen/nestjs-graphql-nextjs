import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.enableShutdownHooks()
  app.useGlobalPipes(new ValidationPipe())
  //   app.enableCors({ //для сайта после деплоя разкомментировать
  //   origin: 'http://my-shop-front.com', // Разрешаем только твоему фронтенду
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Нужно, если будешь передавать куки или сессии
  // });
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
