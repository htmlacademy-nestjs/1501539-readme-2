import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { DatabaseEnvValidator } from './database-env.validator';

export interface DatabaseConfig {
  databaseUrl: string;
}

async function getConfig(): Promise<DatabaseConfig> {
  const config = plainToClass(DatabaseEnvValidator, {
    databaseUrl: process.env.DATABASE_URL,
  });
  await config.validate();
  return config;
}

export default registerAs(
  'database',
  async (): Promise<ConfigType<typeof getConfig>> => getConfig()
);
