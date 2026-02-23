import { plainToClass } from "class-transformer";
import { JWTEnvValidator } from "./jwt-env.validator";
import { ConfigType, registerAs } from "@nestjs/config";

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
}

async function getJWTConfig(): Promise<JWTConfig> {
  const config = plainToClass(JWTEnvValidator, {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

  await config.validate();

  return config;
}

export default registerAs('jwt', async (): Promise<ConfigType<typeof getJWTConfig>> => {
  return getJWTConfig();
});
