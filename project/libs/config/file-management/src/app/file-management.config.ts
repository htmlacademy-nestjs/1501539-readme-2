import { plainToClass } from "class-transformer";
import { FileEnvValidator } from "./file-env.validator";
import { ConfigType, registerAs } from "@nestjs/config";
import { DEFAULT_PORT } from "@project/constants";

const DEFAULT_SERVE_ROOT = '/static';

export interface FileManagementConfig {
  environment: string;
  port: number;
  uploadPath: string;
  /** URL-путь, по которому раздаётся статика (например /static) */
  serveRoot: string;
}

const getConfig = async (): Promise<FileManagementConfig> => {
  const config = plainToClass(FileEnvValidator, {
    environment: process.env.ENVIRONMENT,
    port: isNaN(Number(process.env.PORT)) ? DEFAULT_PORT : Number(process.env.PORT),
    uploadPath: process.env.UPLOAD_PATH,
    serveRoot: process.env.SERVE_ROOT ?? DEFAULT_SERVE_ROOT,
  });
  await config.validate();
  return config;
}

export default registerAs('file-management', async (): Promise<ConfigType<typeof getConfig>> => await getConfig());
