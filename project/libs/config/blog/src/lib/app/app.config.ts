import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { AppEnvValidator } from './app-env.validator';
import { DEFAULT_PORT } from '@project/constants';

export interface ApplicationConfig {
  environment: string;
  port: number;
}

async function getConfig(): Promise<ApplicationConfig> {
  const config = plainToClass(AppEnvValidator, {
    environment: process.env.ENVIRONMENT,
    port: isNaN(Number(process.env.PORT)) ? DEFAULT_PORT : Number(process.env.PORT)
  });
  await config.validate();
  return config;
}

export default registerAs('app', async (): Promise<ConfigType<typeof getConfig>> => {
  return getConfig();
});
