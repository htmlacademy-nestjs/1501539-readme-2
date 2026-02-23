import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app/app.config';
import dbConfig from './mongo/mongo.config';
import jwtConfig from './jwt/jwt.config';

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigAccountModule { }
