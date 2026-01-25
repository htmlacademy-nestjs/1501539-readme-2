import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigAccountModule, getMongooseOptions } from '@project/config-account';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BlogUserModule, AuthModule, ConfigAccountModule, MongooseModule.forRootAsync(getMongooseOptions())],
  controllers: [],
  providers: [],
})
export class AppModule {}
