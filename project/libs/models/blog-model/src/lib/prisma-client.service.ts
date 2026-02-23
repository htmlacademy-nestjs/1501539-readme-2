import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('database.databaseUrl');
    if (!connectionString) {
      throw new Error(
        'database.databaseUrl is not set. Check ConfigBlogModule env files (e.g. libs/models/blog-model/.env) and DATABASE_URL.',
      );
    }
    const adapter = new PrismaPg({ connectionString });
    super({ adapter, log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'], });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
