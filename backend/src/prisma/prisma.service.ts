import {
  Injectable,
  OnModuleInit,
  BeforeApplicationShutdown,
} from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, BeforeApplicationShutdown
{
  private pool: Pool

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    const adapter = new PrismaPg(pool)
    super({ adapter })
    this.pool = pool
  }

  async onModuleInit() {
    await this.$connect()
  }

  async beforeApplicationShutdown() {
    await this.pool.end()
    await this.$disconnect()
  }
}
