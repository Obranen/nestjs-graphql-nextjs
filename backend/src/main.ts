import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load .env from project root (parent of backend directory)
const envPath = path.resolve(process.cwd(), '../.env')
console.log('Loading .env from:', envPath)
console.log('File exists:', fs.existsSync(envPath))

dotenv.config({ path: envPath })
console.log('DATABASE_URL after dotenv:', process.env.DATABASE_URL)

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.enableShutdownHooks()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
