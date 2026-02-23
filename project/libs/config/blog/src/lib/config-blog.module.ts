import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import databaseConfig from './database/database.config';

const ENV_PATHS = ['apps/blog/blog.env', 'libs/models/blog-model/.env'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig],
      envFilePath: ENV_PATHS,
    }),
  ],
})
export class ConfigBlogModule {}
