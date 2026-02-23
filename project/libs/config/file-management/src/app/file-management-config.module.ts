import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import fileManagementConfig from './file-management.config';
import mongoConfig from '../mongo/mongo.config';

const ENV_FILE_PATH = 'apps/file-management/file-management.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileManagementConfig, mongoConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class FileManagementConfigModule {}
