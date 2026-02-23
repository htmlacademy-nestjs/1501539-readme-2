import { plainToClass } from "class-transformer";
import { MongoEnvValidator } from "./mongo-env.validaator";
import { DEFAULT_MONGO_PORT } from "@project/constants";
import { ConfigType, registerAs } from "@nestjs/config";

export interface MongoConfig {
  host: string;
  port: number;
  database: string;
  authDatabase: string;
  user: string;
  password: string;
}

async function getMongoConfig(): Promise<MongoConfig> {
  const config = plainToClass(MongoEnvValidator, {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : DEFAULT_MONGO_PORT,
    database: process.env.MONGO_DB ?? process.env.MONGO_DATABASE,
    authDatabase: process.env.MONGO_AUTH_BASE,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  })
  await config.validate();
  return config;
}

export default registerAs('mongo', async (): Promise<ConfigType<typeof getMongoConfig>> => {
  return getMongoConfig();
})
